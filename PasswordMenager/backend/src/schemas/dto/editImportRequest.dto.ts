import {
  IsArray,
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { ImportRequestState } from '../importRequest.schema';

export class EditImportRequest {
  @IsString()
  @IsOptional()
  readonly userid?;

  @IsString()
  @IsOptional()
  readonly created?;

  @IsEnum(ImportRequestState)
  @IsOptional()
  readonly state: ImportRequestState;

  //TODO: ImportEntrySchema validation
  @IsArray()
  @IsOptional()
  readonly entriesToImport?;
}
