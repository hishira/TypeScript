import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { JwtService } from '@nestjs/jwt';
import { CreateUserEvent } from 'src/events/createUserEvent';
import { EventTypes } from 'src/events/eventTypes';
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
enum AuthError {
  ValidateUserNotExists = 'User not exists',
  ValidateUserNotExistsWrongPassword = 'User passowrds not match',
  ValidateUserNotExistsContext = 'Auth service: validateUser method',
  CreateUserEventEmit = 'Emit create user event',
  CreateUserContext = 'User service: createUser method',
}
@Injectable()
export class AuthService implements LoggerContext {
  debugHandler: LoggerHandler = new LogHandler(this);
  constructor(
    private readonly jwtService: JwtService,
    private readonly eventEmitter: EventEmitter2,
    private readonly queryBus: QueryBus,
    readonly logger: Logger,
  ) {}

  createUser(user: CreateUserDto): Promise<CreateUserDto> {
    this.debugHandler.handle(
      AuthError.CreateUserEventEmit,
      AuthError.CreateUserContext,
    );

    return Promise.resolve(() => {
      return true;
    }).then((_) => {
      this.eventEmitter.emitAsync(
        EventTypes.CreateUser,
        new CreateUserEvent(user),
      );
      return user;
    });
  }
  async valideteUser(userinfo: AuthInfo): Promise<IUser | null> {
    return this.queryBus
      .execute(new GetFilteredUserQueries({ login: userinfo.login }))
      .then(UserUtils.GetFirstUserFromTableOrNull)
      .then((user) => {
        if (user === null) {
          this.debugHandler.handle(
            AuthError.ValidateUserNotExists,
            AuthError.ValidateUserNotExistsContext,
          );
          return null;
        }
        if (user.validatePassword(userinfo.password)) {
          return user;
        }
        this.debugHandler.handle(
          AuthError.ValidateUserNotExistsWrongPassword,
          AuthError.ValidateUserNotExistsContext,
        );
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
