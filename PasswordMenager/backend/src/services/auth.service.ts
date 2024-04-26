import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { JwtService } from '@nestjs/jwt';
import { GetFilteredUserQueries } from 'src/queries/user/getFilteredUser.queries';
import { CreateUserDto } from 'src/schemas/dto/user.dto';
import { UserUtils } from 'src/schemas/utils/user.utils';
import { Logger } from 'src/utils/Logger';
import {
  LogHandler,
  LoggerContext,
  LoggerHandler,
} from 'src/utils/error.handlers';
import {
  AccessTokenOptions,
  RefreshAccessTokenOptions,
  RefreshTokenOptions,
} from '../constans';
import { IUser } from '../schemas/Interfaces/user.interface';
import { AuthInfo } from '../schemas/dto/auth.dto';
import { AuthServiceEventLog } from './eventAndLog/authServiceEventLog';
import { AuthError } from 'src/errors/errors-messages/authenticationErrorMessages';
@Injectable()
export class AuthService implements LoggerContext {
  debugHandler: LoggerHandler = new LogHandler(this);
  private eventLogHelper: AuthServiceEventLog;
  constructor(
    private readonly jwtService: JwtService,
    private readonly eventEmitter: EventEmitter2,
    private readonly queryBus: QueryBus,
    readonly logger: Logger,
  ) {
    this.eventLogHelper = new AuthServiceEventLog(
      this.debugHandler,
      this.eventEmitter,
    );
  }

  createUser(user: CreateUserDto): Promise<CreateUserDto> {
    this.debugHandler.handle(
      AuthError.CreateUserEventEmit,
      AuthError.CreateUserContext,
    );

    return this.eventLogHelper.emitPromiseCreateUserEvent(user);
  }
  async valideteUser(userinfo: AuthInfo): Promise<IUser | null> {
    return this.queryBus
      .execute(new GetFilteredUserQueries({ login: userinfo.login }))
      .then(UserUtils.GetFirstUserFromTableOrNull)
      .then((user) => {
        if (user === null) {
          this.eventLogHelper.userNotExistsDebug();
          return null;
        }
        if (user.validatePassword(userinfo.password)) {
          return user;
        }
        this.eventLogHelper.createLoginEventAndDebug(userinfo);
      });
  }

  login(user: IUser): TokenObject {
    const payload = { login: user.login, _id: user._id };
    return {
      access_token: this.jwtService.sign(payload, AccessTokenOptions),
      refresh_token: this.jwtService.sign(payload, RefreshTokenOptions),
    };
  }

  refreshaccesstoken(user: IUser): AccesTokenObject {
    const payload = user;
    return {
      access_token: this.jwtService.sign(payload, RefreshAccessTokenOptions),
    };
  }
}
