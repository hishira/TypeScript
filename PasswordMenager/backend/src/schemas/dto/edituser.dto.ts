import { IsString, MinLength, IsOptional, IsEmail } from 'class-validator';

export class EditUserDto {
  @IsString()
  @IsOptional()
  readonly login?;

  @IsEmail()
  @IsOptional()
  readonly email?;

  @IsString()
  @IsOptional()
  @MinLength(6)
  readonly password?;

  @IsString()
  @IsOptional()
  @MinLength(6)
  readonly importPassword?;
}
