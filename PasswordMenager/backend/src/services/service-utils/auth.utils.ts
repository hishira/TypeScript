import { JwtService } from '@nestjs/jwt';
import { AccessTokenOptions, RefreshTokenOptions } from 'src/constans';
import { IUser } from 'src/schemas/Interfaces/user.interface';

class Payload {
  constructor(readonly login: string, readonly _id: string) {}

  getParsedPlainObject(): string {
    return JSON.parse(JSON.stringify(this));
  }
}
export class TokenGenerator {
  constructor(private readonly jwtService: JwtService) {}

  generateLoginToken(user: IUser): TokenObject {
    const payload = new Payload(user.login, user._id);
    return {
      access_token: this.jwtService.sign(
        payload.getParsedPlainObject(),
        AccessTokenOptions,
      ),
      refresh_token: this.jwtService.sign(
        payload.getParsedPlainObject(),
        RefreshTokenOptions,
      ),
    };
  }

  refreshAccessToken(user: IUser): AccesTokenObject {
    const payload = new Payload(user.login, user._id);
    return {
      access_token: this.jwtService.sign(
        payload.getParsedPlainObject(),
        RefreshTokenOptions,
      ),
    };
  }
}
