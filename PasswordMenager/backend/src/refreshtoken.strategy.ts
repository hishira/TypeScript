import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './constans';
import { IUser } from './schemas/Interfaces/user.interface';

@Injectable()
export class JwtStrategy2 extends PassportStrategy(Strategy, 'refreshtoken') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.refresh,
    });
  }

  async validate(
    payload: Partial<IUser>,
  ): Promise<{ _id: string; login: string }> {
    return { _id: payload._id, login: payload.login };
  }
}
