import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FilterQuery } from 'mongoose';
import { FilterOption } from 'src/schemas/Interfaces/filteroption.interface';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import {
  AccessTokenOptions,
  RefreshAccessTokenOptions,
  RefreshTokenOptions,
} from '../constans';
import { IUser, UserUtils } from '../schemas/Interfaces/user.interface';
import { AuthInfo } from '../schemas/dto/auth.dto';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject(Repository)
    private readonly userRepository: Repository<IUser>,
  ) {}

  async valideteUser(userinfo: AuthInfo): Promise<IUser | null> {
    const userByLogin: FilterOption<FilterQuery<IUser>> = {
      getOption() {
        return {
          login: userinfo.login,
        };
      },
    };

    return this.userRepository
      .find(userByLogin)
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

  login(user: any) {
    const payload = { login: user.login, _id: user._id };
    return {
      access_token: this.jwtService.sign(payload, AccessTokenOptions),
      refresh_token: this.jwtService.sign(payload, RefreshTokenOptions),
    };
  }

  refreshaccesstoken(user: any) {
    const payload = user;
    return {
      access_token: this.jwtService.sign(payload, RefreshAccessTokenOptions),
    };
  }
}
