import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { JwtService } from '@nestjs/jwt';
import { CreateUserEvent } from 'src/events/createUserEvent';
import { EventTypes } from 'src/events/eventTypes';
import { GetFilteredUserQueries } from 'src/queries/user/getFilteredUser.queries';
import { CreateUserDto } from 'src/schemas/dto/user.dto';
import { UserUtils } from 'src/schemas/utils/user.utils';
import {
  AccessTokenOptions,
  RefreshAccessTokenOptions,
  RefreshTokenOptions,
} from '../constans';
import { IUser } from '../schemas/Interfaces/user.interface';
import { AuthInfo } from '../schemas/dto/auth.dto';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private eventEmitter: EventEmitter2,
    private queryBus: QueryBus,
  ) {}

  async createUser(user: CreateUserDto) {
    return this.eventEmitter.emitAsync(
      EventTypes.CreateUser,
      new CreateUserEvent(user),
    );
  }
  async valideteUser(userinfo: AuthInfo): Promise<IUser | null> {
    return this.queryBus
      .execute(new GetFilteredUserQueries({ login: userinfo.login }))
      .then(UserUtils.GetFirstUserFromTableOrNull)
      .then((user) => {
        if (user === null) {
          return null;
        }
        if (user.validatePassword(userinfo.password)) {
          return user;
        }
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
