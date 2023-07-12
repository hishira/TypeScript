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
    // Default column => name, site(in future), username - email, password,note.
    const names = [];
    const sites = [];
    const username = [];
    const password = [];
    const notes = [];
    const stream = Readable.from(file.buffer);
    const write = new Writable();
    const promise = new Promise<void>((resolve, rejext) => {
      write._write = (chunk, encoding, next) => {
        const csvString = chunk.toString() as string;
        const csvRows = csvString.split('\r\n');
        csvRows.forEach((csvRovValue) => {
          const values = csvRovValue.split(',');
          names.push(values.shift());
          username.push(values.shift());
          password.push(values.shift());
          notes.push(values.shift());
        });
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
