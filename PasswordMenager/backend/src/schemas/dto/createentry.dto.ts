import {
  IsDateString,
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { DTO } from './object.interface';

export class CreateEntryDto implements DTO {
  @IsString()
  readonly title;

  @IsString()
  readonly username;

  @IsString()
  @MinLength(6)
  readonly password;

  @IsString()
  readonly note;

  @IsString()
  @IsOptional()
  readonly groupid;

  @IsString()
  @IsEmail()
  @IsOptional()
  readonly email;

  @IsString()
  @IsOptional()
  readonly url;

  @IsOptional()
  @IsDateString()
  readonly passwordExpiredDate?;

  toObject(): Record<string, unknown> {
    return {
      title: this.title,
      username: this.username,
      password: this.password,
      note: this.note,
      groupid: this.groupid,
      email: this.email,
      url: this.url,
    };
  }
}
