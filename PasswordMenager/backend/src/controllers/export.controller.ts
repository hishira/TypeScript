import {
  Controller,
  Get,
  Inject,
  ParseFilePipeBuilder,
  Post,
  Request,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  createCipheriv,
  pbkdf2,
  randomBytes,
  pbkdf2Sync,
  createDecipheriv,
} from 'crypto';
import { Response } from 'express';
import { createReadStream, createWriteStream } from 'fs';
import { FileInterceptor } from '@nestjs/platform-express';

import { IEntry } from 'src/schemas/Interfaces/entry.interface';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { ExportService } from 'src/services/export.service';
import { Readable } from 'stream';
// TODO: Check if work as expected witth promise
@Controller('export')
export class ExportController {
  constructor(
    private readonly exportService: ExportService,
    @Inject(Repository)
    private readonly entryService: Repository<IEntry>,
  ) {}

  @Get('csv')
  @UseGuards(AuthGuard('accessToken'))
  getCsv(@Request() req, @Res() response: Response) {
    this.exportService.getCsvFile(req.user.id).then((csvString) => {
      response
        .set({
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="users.csv"`,
        })
        .attachment('users.csv')
        .send(csvString);
    });
  }

  @Post('decrypt')
  @UseInterceptors(FileInterceptor('file'))
  async decryptData(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: 'xyz' })
        .build(),
    )
    file: Express.Multer.File,
  ) {
    const buffer = Buffer.from(file.buffer);
    const salt = buffer.slice(0, 16);
    const iv = buffer.slice(16, 32);
    const encryptedContent = buffer.slice(32);
    const key = pbkdf2Sync('123456', salt, 100000, 32, 'sha256');
    const decipher = createDecipheriv('aes-256-cbc', key, iv);
    const decryptedContent = Buffer.concat([
      decipher.update(encryptedContent),
      decipher.final(),
    ]);
    console.log(decryptedContent.toString('utf8'));
  }
  @Get('encrypted')
  async getEncryptFile(@Res() res: Response) {
    const entries = await this.entryService.find({
      getOption() {
        return {};
      },
    });
    const passwords = [];
    entries.forEach((entry) => passwords.push(entry.password));
    const fileContent = passwords.join(',');
    console.log(fileContent);
    const password = '123456';
    const salt = randomBytes(16); // Generate a random salt

    const key = pbkdf2Sync(password, salt, 100000, 32, 'sha256');
    const iv = randomBytes(16); // Generate a random IV

    const cipher = createCipheriv('aes-256-cbc', key, iv);
    let encryptedContent = cipher.update(fileContent, 'utf8', 'hex');
    encryptedContent += cipher.final('hex');

    const encryptedData = Buffer.concat([
      salt,
      iv,
      Buffer.from(encryptedContent, 'hex'),
    ]);
    res.set({
      'Content-Disposition': 'attachment; filename=example.txt.xyz',
      'Content-Type': 'application/octet-stream',
    });
    res.send(encryptedData);
  }

  @Get('encryptedCsv')
  @UseGuards(AuthGuard('accessToken'))
  async getEncryptCsv(@Request() req, @Res() response: Response) {
    response
      .set({
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="users.zip"`,
      })
      .attachment('file.zip');
    this.exportService.getCsvZipedFile(req.user.id).then((resp) => {
      resp.pipe(response);
      resp.finalize();
    });
  }
}
