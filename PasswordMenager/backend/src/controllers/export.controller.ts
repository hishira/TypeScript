import {
  Body,
  Controller,
  Get,
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
import { Response } from 'express';

import { ExportService } from 'src/services/export.service';
import { ExportCsvUtils } from 'src/utils/export.utils';
@Controller('export')
export class ExportController {
  constructor(private readonly exportService: ExportService) {}

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

  @Get('json')
  @UseGuards(AuthGuard('accessToken'))
  getJson(@Request() req, @Res() response: Response) {
    this.exportService.getJsonFile(req.user._id).then((json) => {
      response
        .set({
          'Content-Type': 'text/json',
          'Content-Disposition': `attachment; filename="users.json"`,
        })
        .attachment('users.json')
        .send(json);
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
    const encyptedBuffer = await this.exportService.getEncryptedFile(
      req.user._id,
    );
    res.set({
      'Content-Disposition': 'attachment; filename=example.txt.xyz',
      'Content-Type': 'text/xyz',
    });
    res.send(encyptedBuffer);
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
