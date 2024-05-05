import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './constans';
import { IUser } from './schemas/Interfaces/user.interface';

type Payload = { _id: string; login: string };
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'accessToken') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: Partial<IUser>): Promise<Payload> {
    return { _id: payload._id, login: payload.login };
  }
}
