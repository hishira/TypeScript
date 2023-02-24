import { IsString, IsOptional } from 'class-validator';

export class GroupDto {
  @IsString()
  @IsOptional()
  readonly _id?;

  @IsString()
  readonly name;

  @IsString()
  readonly userid;
}
