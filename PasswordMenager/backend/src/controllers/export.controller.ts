import {
  Controller,
  Get,
  Inject,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { createCipheriv, pbkdf2, randomBytes } from 'crypto';
import { Response } from 'express';
import { createReadStream, createWriteStream } from 'fs';
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

  @Get('encrypted')
  async getEncryptFile(@Res() res: Response) {
    const entries = await this.entryService.find({
      getOption() {
        return {};
      },
    });
    const passwords = [];
    entries.forEach((entry) => passwords.push(entry.password));

    const key = randomBytes(16);
    const iv = randomBytes(16);
    pbkdf2('123456', 'salt', 100, 32, 'sha256', (err, key) => {
      const cipher = createCipheriv('aria-256-ofb', Buffer.from(key), iv);
      let encrypted = cipher.update(passwords.join(','));
      encrypted = Buffer.concat([encrypted, cipher.final()]);
      console.log(encrypted.toString('utf-8'));
    });
    return res.send('ok');
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
