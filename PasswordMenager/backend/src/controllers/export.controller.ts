import { Controller, Get, Request, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { EntryService } from 'src/services/entry.service';
import { writeFileSync } from 'fs';
import * as Archiver from 'archiver';
import { Readable } from 'stream';
import { ExportService } from 'src/services/export.service';
// TODO: Check if work as expected witth promise
@Controller('export')
export class ExportController {
  constructor(
    private readonly entryService: EntryService,
    private readonly exportService: ExportService,
  ) {}

  @Get('csv')
  @UseGuards(AuthGuard('accessToken'))
  getCsv(@Request() req, @Res() response: Response) {
    console.log(req.user);
    //const entries = await
    this.entryService.getByUser(req.user.id).then((resp) => {
      let csvData = ['title', 'password', 'note'].join(', ') + '\r\n';
      resp.forEach((entry) => {
        csvData += [entry.title, entry.password, entry.note].join(',') + '\r\n';
      });
      response
        .set({
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="users.csv"`,
        })
        .attachment('users.csv')
        .send(csvData);
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
    this.exportService.getCsvFiles(req.user.id).then((resp) => {
      resp.pipe(response);
      resp.finalize();
    });
  }
}
