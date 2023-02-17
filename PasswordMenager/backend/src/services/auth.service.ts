import { Model, NativeError } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { IUser } from '../schemas/Interfaces/user.interface';
import { AuthInfo } from '../schemas/dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../constans';
@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<IUser>,
    private jwtService: JwtService,
  ) {}

  async valideteUser(userinfo: AuthInfo): Promise<IUser | null> {
    const user = await this.userModel.findOne({ login: userinfo.login });
    if (user === null) {
      return null;
    }
    if (user.validatePassword(userinfo.password)) {
      return user;
    }
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
