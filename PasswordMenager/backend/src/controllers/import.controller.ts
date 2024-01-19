import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseFilePipeBuilder,
  Post,
  Put,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { EditImportRequest } from 'src/schemas/dto/editImportRequest.dto';
import { ImportService } from 'src/services/import.service';
import { EmptyFileValidator } from 'src/validators/emptyfile.validator';
import { CustomFileValidator } from 'src/validators/file.validator';
import { JSONFileValidator } from 'src/validators/json.file.validator';
import { NotFileValidator } from 'src/validators/notfile.validator';
import { Readable, Writable } from 'stream';

const CSVPipeBuilder = new ParseFilePipeBuilder()
  .addFileTypeValidator({ fileType: 'csv' })
  .addMaxSizeValidator({ maxSize: 10000 })
  .addValidator(new NotFileValidator())
  .addValidator(new EmptyFileValidator())
  .addValidator(new CustomFileValidator())
  .build();

const JSONPipeBuilder = new ParseFilePipeBuilder()
  .addFileTypeValidator({ fileType: 'json' })
  .addMaxSizeValidator({ maxSize: 1000000 })
  .addValidator(new NotFileValidator())
  .addValidator(new EmptyFileValidator())
  .addValidator(new JSONFileValidator())
  .build();
@Controller('import')
export class ImportController {
  constructor(private importService: ImportService) {}

  @UseGuards(AuthGuard('accessToken'))
  @Get('importRequest')
  getImportRequests(@Request() req) {
    return this.importService.getUserImportRequest(req.user._id);
  }

  @UseGuards(AuthGuard('accessToken'))
  @Get('activate/:id')
  activateImportRequest(@Request() req, @Param('id') importRequestId: string) {
    return this.importService.activateImportRequest(
      importRequestId,
      req.user._id,
    );
  }

  @UseGuards(AuthGuard('accessToken'))
  @Delete('/:id')
  deleteImportRequest(@Param('id') importRequestId: string) {
    return this.importService.deleteImportRequest(importRequestId);
  }

  @UseGuards(AuthGuard('accessToken'))
  @Put('/:id')
  updateImportRequest(
    @Param('id') importRequestId: string,
    @Body(new ValidationPipe({ transform: true }))
    editImportRequestDto: EditImportRequest,
  ) {
    return this.importService.editImpoerRequest(
      importRequestId,
      editImportRequestDto,
    );
  }

  @UseGuards(AuthGuard('accessToken'))
  @Post('checkCsv')
  @UseInterceptors(FileInterceptor('file'))
  checkCsvFile(
    @Request() req,
    @UploadedFile(CSVPipeBuilder)
    file: Express.Multer.File,
  ) {
    return this.importService.importEntriesFromFile(file, req.user._id);
  }

  @UseGuards(AuthGuard('accessToken'))
  @Post('checkJson')
  @UseInterceptors(FileInterceptor('file'))
  checkJsonFile(
    @Request() req,
    @UploadedFile(JSONPipeBuilder)
    file: Express.Multer.File,
  ) {
    console.log(file);
    return Promise.resolve(true); //this.importService.importEntriesFromFile(file, req.user._id);
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
