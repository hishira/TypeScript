import { ParseFilePipeBuilder } from '@nestjs/common';
import { EmptyFileValidator } from 'src/validators/emptyfile.validator';
import { CustomFileValidator } from 'src/validators/file.validator';
import { NotFileValidator } from 'src/validators/notfile.validator';

export const CSVPipeBuilder = new ParseFilePipeBuilder()
  .addFileTypeValidator({ fileType: 'csv' })
  .addMaxSizeValidator({ maxSize: 10000 })
  .addValidator(new NotFileValidator())
  .addValidator(new EmptyFileValidator())
  .addValidator(new CustomFileValidator())
  .build();
