import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FilterQuery, Model } from 'mongoose';
import { FilterOption } from 'src/schemas/Interfaces/filteroption.interface';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { jwtConstants } from '../constans';
import { AuthInfo } from '../schemas/dto/auth.dto';
import { IUser } from '../schemas/Interfaces/user.interface';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject(Repository)
    private readonly userRepository: Repository<IUser>,
  ) {}

  static getFirstUser(users: IUser[]): IUser | null {
    console.log(users);
    if (users && users.length) {
      return users[0];
    }
    return null;
  }

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
      .then(AuthService.getFirstUser)
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
      access_token: this.jwtService.sign(payload, {
        expiresIn: '2d',
        secret: jwtConstants.secret,
      }),
      refresh_token: this.jwtService.sign(payload, {
        expiresIn: '1d',
        secret: jwtConstants.refresh,
      }),
    };
  }

  refreshaccesstoken(user: any) {
    const payload = user;
    return {
      access_token: this.jwtService.sign(payload, {
        expiresIn: '180s',
        secret: jwtConstants.secret,
      }),
    };
  }
}
