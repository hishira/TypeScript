import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { jwtConstants } from '../constans';
import { AuthInfo } from '../schemas/dto/auth.dto';
import { IUser } from '../schemas/Interfaces/user.interface';
@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<IUser>,
    private jwtService: JwtService,
  ) {}

  async valideteUser(userinfo: AuthInfo): Promise<IUser | null> {
    return this.userModel.findOne({ login: userinfo.login }).then((user) => {
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
