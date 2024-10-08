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
  getCsv(
    @Request() req,
    @Res() response: Response,
  ): Promise<void | Response<string, Record<string, Record<string, string>>>> {
    return this.exportService.getCsvFile(req.user._id).then((csvString) => {
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
  getJson(
    @Request() req,
    @Res() response: Response,
  ): Promise<void | Response<string, Record<string, Record<string, string>>>> {
    return this.exportService.getJsonFile(req.user._id).then((json) => {
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
  ): Promise<void | Response<string, Record<string, Record<string, string>>>> {
    return response
      .status(200)
      .send(ExportCsvUtils.GetEncryptedValueFromFile(file));
  }

  @UseGuards(AuthGuard('accessToken'))
  @Get('encrypted')
  getEncryptFile(
    @Req() req,
    @Res() res: Response,
  ): Promise<void | Response<string, Record<string, Record<string, string>>>> {
    //TODO: Check if work
    return this.exportService
      .getEncryptedFile(req.user._id)
      .then((response) => {
        res.set({
          'Content-Disposition': 'attachment; filename=example.txt.xyz',
          'Content-Type': 'text/xyz',
        });
        return res.send(response);
      });
  }

  @Get('encryptedCsv')
  @UseGuards(AuthGuard('accessToken'))
  getEncryptCsv(
    @Request() req,
    @Res() response: Response,
  ): Promise<void | Response<string, Record<string, Record<string, string>>>> {
    response
      .set({
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="users.zip"`,
      })
      .attachment('file.zip');
    return this.exportService.getCsvZipedFile(req.user.id).then((resp) => {
      resp.pipe(response);
      resp.finalize();
    });
  }
}
