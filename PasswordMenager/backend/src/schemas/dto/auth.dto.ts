import { IsString, MinLength } from 'class-validator';

export class AuthInfo {
  @IsString()
  readonly login;

  @IsString()
  @MinLength(6)
  readonly password;
}
