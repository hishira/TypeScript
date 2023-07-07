import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly login;

  @IsString()
  @MinLength(6)
  readonly password;

  @IsString()
  @IsEmail()
  readonly email;
}
