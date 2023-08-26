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
import { createCipheriv, pbkdf2Sync, randomBytes } from 'crypto';
import { Response } from 'express';

import { IEntry } from 'src/schemas/Interfaces/entry.interface';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { ExportService } from 'src/services/export.service';
import { ExportCsvUtils } from 'src/utils/export.utils';
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
    this.exportService.getCsvFile(req.user._id).then((csvString) => {
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
    response.status(200).send(ExportCsvUtils.GetEncryptedValueFromFile(file));
  }

  @UseGuards(AuthGuard('accessToken'))
  @Get('encrypted')
  async getEncryptFile(@Req() req, @Res() res: Response) {
    const entries = await this.entryService.find({
      getOption() {
        return {};
      },
    });
    res.set({
      'Content-Disposition': 'attachment; filename=example.txt.xyz',
      'Content-Type': 'application/octet-stream',
    });
    res.send(ExportCsvUtils.GetEncryptedDataBuffer(entries));
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
