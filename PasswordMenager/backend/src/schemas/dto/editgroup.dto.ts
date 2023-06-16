import { IsString } from 'class-validator';

export class EditGroupDto {
  @IsString()
  readonly name;
}
