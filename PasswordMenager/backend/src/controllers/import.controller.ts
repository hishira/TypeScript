import {
  Controller,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { EmptyFileValidator } from 'src/validators/emptyfile.validator';
import { CustomFileValidator } from 'src/validators/file.validator';
import { NotFileValidator } from 'src/validators/notfile.validator';
import { Readable, Writable } from 'stream';
@Controller('import')
export class ImportController {
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
    const stream = Readable.from(file.buffer);
    const write = new Writable();
    const promise = new Promise<void>((resolve, rejext) => {
      write._write = (chunk, encoding, next) => {
        const csvString = chunk.toString() as string;
        csvString.split('\r\n').forEach((test) => console.log(test));
        next();
      };
      stream.pipe(write);
      stream.on('end', () => {
        write.end();
        resolve();
      });
    }).then((_) => {
      throw new Error('Not implemented');
    });
    return promise;
  }
}
