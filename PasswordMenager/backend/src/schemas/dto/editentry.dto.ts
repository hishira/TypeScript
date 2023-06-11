import { IsOptional, IsString } from 'class-validator';

export class EditEntryDto {
  @IsString()
  readonly _id;

  @IsString()
  readonly title;

  @IsString()
  readonly username;

  @IsString()
  readonly password;

  @IsOptional()
  readonly email;

  @IsString()
  readonly note;
}
