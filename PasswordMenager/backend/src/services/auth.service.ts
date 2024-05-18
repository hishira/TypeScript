import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { JwtService } from '@nestjs/jwt';
import { GetFilteredUserQueries } from 'src/queries/user/getFilteredUser.queries';
import { CreateUserDto } from 'src/schemas/dto/user.dto';
import { UserUtils } from 'src/schemas/utils/user.utils';
import { Logger } from 'src/utils/Logger';
import { LogHandler, LoggerContext } from 'src/utils/error.handlers';
import {
  AccessTokenOptions,
  RefreshAccessTokenOptions,
  RefreshTokenOptions,
} from '../constans';
import { IUser } from '../schemas/Interfaces/user.interface';
import { AuthInfo } from '../schemas/dto/auth.dto';
import { AuthServiceEventLog } from './eventAndLog/authServiceEventLog';
import { TokenGenerator } from './service-utils/auth.utils';
@Injectable()
export class AuthService implements LoggerContext {
  private eventLogHelper: AuthServiceEventLog;
  private tokenGenerator: TokenGenerator;
  constructor(
    private readonly jwtService: JwtService,
    private readonly eventEmitter: EventEmitter2,
    private readonly queryBus: QueryBus,
    readonly logger: Logger,
  ) {
    this.eventLogHelper = new AuthServiceEventLog(
      new LogHandler(this),
      this.eventEmitter,
    );
    this.tokenGenerator = new TokenGenerator(this.jwtService);
  }

  createUser(user: CreateUserDto): Promise<CreateUserDto> {
    return this.eventLogHelper.emitPromiseCreateUserEvent(user);
  }

  valideteUser(userinfo: AuthInfo): Promise<IUser | null> {
    return this.queryBus
      .execute(new GetFilteredUserQueries({ login: userinfo.login }))
      .then(UserUtils.GetFirstUserFromTableOrNull)
      .then((user) => {
        return this.userCheckAndEventHandle(user, userinfo);
      });
  }

  login(user: IUser): TokenObject {
    return this.tokenGenerator.generateLoginToken(user);
  }

  refreshaccesstoken(user: IUser): AccesTokenObject {
    return this.tokenGenerator.refreshAccessToken(user);
  }

  private userCheckAndEventHandle(
    user: IUser,
    userinfo: AuthInfo,
  ): IUser | null {
    if (user === null) {
      this.eventLogHelper.userNotExistsDebug();

      return null;
    }
    if (user.validatePassword(userinfo.password)) {
      this.eventLogHelper.userLoginEvent(userinfo);

      return user;
    }
    this.eventLogHelper.createLoginEventAndDebug(userinfo);
  }
}
