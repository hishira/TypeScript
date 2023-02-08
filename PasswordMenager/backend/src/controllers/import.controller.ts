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
        .build(),
    )
    file: Express.Multer.File,
  ) {
    console.log(file);
  }
}
