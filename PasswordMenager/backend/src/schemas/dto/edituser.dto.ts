import { IsString, MinLength, IsOptional } from 'class-validator';

export class EditUserDto {
  @IsString()
  @IsOptional()
  readonly login;

  @IsString()
  @IsOptional()
  @MinLength(6)
  readonly password;
}
