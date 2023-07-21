import {
  Controller,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImportEntrySchema } from 'src/schemas/Interfaces/importRequest.interface';
import { EmptyFileValidator } from 'src/validators/emptyfile.validator';
import { CustomFileValidator } from 'src/validators/file.validator';
import { NotFileValidator } from 'src/validators/notfile.validator';
import { Readable, Writable } from 'stream';
@Controller('import')
export class ImportController {
  @Post('checkCsv')
  @UseInterceptors(FileInterceptor('file'))
  checkCsvFile(
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
    //const names = [];
    //const sites = [];
    //const username = [];
    //const password = [];
    //const notes = [];
    const stream = Readable.from(file.buffer);
    const write = new Writable();
    const datas: ImportEntrySchema[] = [];
    const promise = new Promise<any[]>((resolve, rejext) => {
      write._write = (chunk, encoding, next) => {
        const csvString = chunk.toString() as string;
        const csvRows = csvString.split('\r\n');
        csvRows.forEach((csvRovValue) => {
          const values = csvRovValue.split(',');
          const name = values.shift();
          const username = values.shift();
          const password = values.shift();
          const note = values.shift();
          datas.push(new ImportEntrySchema(password, username, name, note, ''));
        });
        next();
      };
      stream.pipe(write);
      stream.on('end', () => {
        write.end();
        resolve(datas);
      });
    }).then((_) => {
      return _;
      //throw new Error('Not implemented');
    });
    return promise;
  }
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
    const promise = new Promise<any[]>((resolve, rejext) => {
      const c = [];
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
        resolve(password);
      });
    }).then((_) => {
      return _;
      //throw new Error('Not implemented');
    });
    return promise;
  }
}
