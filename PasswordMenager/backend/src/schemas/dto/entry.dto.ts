import { IsString } from 'class-validator';
import { CreateEntryDto } from './createentry.dto';
import { DTO } from './object.interface';

export class EntryDto extends CreateEntryDto {
  @IsString()
  readonly userid;
  override toObject(): Record<string, unknown> {
    return {
      ...this.toObject(),
      userid: this.userid,
    };
  }
}
