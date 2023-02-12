import {
  Controller,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Multer } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { tap } from 'rxjs';
import { CustomFileValidator } from 'src/validators/file.validator';
import { EmptyFileValidator } from 'src/validators/emptyfile.validator';
import { NotFileValidator } from 'src/validators/notfile.validator';
@Controller('import')
export class ImportController {
  constructor() {}

  @Post('csv')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: 'csv' })
        .addMaxSizeValidator({ maxSize: 10000 })
        .addValidator(new NotFileValidator())
        .addValidator(new EmptyFileValidator())
        .addValidator(new CustomFileValidator())
        .build(),
    )
    file: Express.Multer.File,
  ) {
    console.log(file);
  }
}
