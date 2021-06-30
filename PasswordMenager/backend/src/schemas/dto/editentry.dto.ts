import { IsString } from 'class-validator';

export class EditEntryDto {
  @IsString()
  readonly _id;

  @IsString()
  readonly title;

  @IsString()
  readonly username;

  @IsString()
  readonly password;

  @IsString()
  readonly note;
}
