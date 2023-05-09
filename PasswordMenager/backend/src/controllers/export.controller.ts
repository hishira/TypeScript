import {
  Body,
  Controller,
  Get,
  Inject,
  ParseFilePipeBuilder,
  Post,
  Req,
  Request,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  createCipheriv,
  createDecipheriv,
  pbkdf2Sync,
  randomBytes,
} from 'crypto';
import { Response, response } from 'express';

import { IEntry } from 'src/schemas/Interfaces/entry.interface';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { ExportService } from 'src/services/export.service';
// TODO: Check if work as expected witth promise, REFACTOR !!!Important
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
    @UploadedFile(new ParseFilePipeBuilder().build({ fileIsRequired: false }))
    file: Express.Multer.File,
    @Res() response: Response,
    @Body() restOfParams,
  ) {
    console.log(restOfParams);
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
    response.status(200).send(decryptedContent.toString('utf8'));
  }

  @UseGuards(AuthGuard('accessToken'))
  @Get('encrypted')
  async getEncryptFile(@Req() req, @Res() res: Response) {
    const entries = await this.entryService.find({
      getOption() {
        return {};
      },
    });
    const passwords = [];
    entries.forEach((entry) => passwords.push(entry.password));
    const fileContent = passwords.join(',');
    const password = '123456';
    const salt = randomBytes(16); // Generate a random salt

    const key = pbkdf2Sync(password, salt, 100000, 32, 'sha256');
    const iv = randomBytes(16); // Generate a random IV

    const cipher = createCipheriv('aes-256-cbc', key, iv);
    let encryptedContent = cipher.update(fileContent, 'utf8', 'hex');
    encryptedContent += cipher.final('hex');
    // Save salt and iv in file
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
