import { ParseFilePipeBuilder } from '@nestjs/common';
import { EmptyFileValidator } from 'src/validators/emptyfile.validator';
import { JSONFileValidator } from 'src/validators/json.file.validator';
import { NotFileValidator } from 'src/validators/notfile.validator';

export const JSONPipeBuilder = new ParseFilePipeBuilder()
  .addFileTypeValidator({ fileType: 'json' })
  .addMaxSizeValidator({ maxSize: 1000000 })
  .addValidator(new NotFileValidator())
  .addValidator(new EmptyFileValidator())
  .addValidator(new JSONFileValidator())
  .build();
