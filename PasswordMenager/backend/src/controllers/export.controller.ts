import { Controller, Get, Request, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { ExportService } from 'src/services/export.service';
// TODO: Check if work as expected witth promise
@Controller('export')
export class ExportController {
  constructor(private readonly exportService: ExportService) {}

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
