import {
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { ImportEntrySchemaValidator } from 'src/validators/importEntrySchema.validator';
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

  @IsArray()
  @Validate(ImportEntrySchemaValidator, { each: true })
  @IsOptional()
  readonly entriesToImport?;
}
