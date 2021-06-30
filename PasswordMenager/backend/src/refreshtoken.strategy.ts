import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constans';


@Injectable()
export class JwtStrategy2 extends PassportStrategy(Strategy,"refreshtoken") {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.refresh,
    });
  }

  async validate(payload: any) {
    return { _id: payload._id, login: payload.login };
  }
}