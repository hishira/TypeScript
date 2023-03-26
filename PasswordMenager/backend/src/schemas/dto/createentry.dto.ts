import { IsString, MinLength } from 'class-validator';
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
  readonly groupid;

  toObject(): Record<string, unknown> {
    return {
      title: this.title,
      username: this.username,
      password: this.password,
      note: this.note,
      groupid: this.groupid,
    };
  }
}
