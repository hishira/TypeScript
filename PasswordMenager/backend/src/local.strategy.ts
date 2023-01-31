import { HttpVersionNotSupportedException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UnknownUserException } from './errors/UnknownUser.error';
import { UnknownUserExceptionFilter } from './errors/UnknownUserFilter';
import { AuthService } from './services/auth.service';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'login', passwordField: 'password' });
  }

  async validate(login: string, password: string): Promise<any> {
    const user = await this.authService.valideteUser({ login, password });
    console.log(user);
    if (!user) {
      throw new UnknownUserException();
    } else return user;
  }
}
