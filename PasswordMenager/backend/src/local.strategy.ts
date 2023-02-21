import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UnknownUserException } from './errors/UnknownUser.error';
import { IUser } from './schemas/Interfaces/user.interface';
import { AuthService } from './services/auth.service';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'login', passwordField: 'password' });
  }

  validate(login: string, password: string): Promise<IUser> {
    return this.authService.valideteUser({ login, password }).then((user) => {
      if (!user) {
        throw new UnknownUserException();
      }
      return user;
    });
  }
}
