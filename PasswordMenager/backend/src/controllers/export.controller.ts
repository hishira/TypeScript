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
    //this.entryService.getByUser(req.user.id).then((resp) => {
    //  let csvData = [['title', 'password', 'note', '\r\n']];
    //  resp.forEach((entry) => {
    //    csvData.push([entry.title, entry.password, entry.note, '\r\n']);
    //  });
    //  const readable = new Readable({
    //    read() {
    //      this.push(csvData.shift().join(','));
    //      if (!csvData.length) {
    //        this.push(null);
    //      }
    //    },
    //    destroy() {
    //      csvData = null;
    //    },
    //  });
    //  const archiver = Archiver('zip', {
    //    zlib: { level: 9 },
    //    forceLocalTime: true,
    //  });
    //  archiver.on('error', (err) => console.log(err));
    //  archiver.append(readable, { name: 'users.csv' });
    response
      .set({
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="users.zip"`,
      })
      .attachment('file.zip');
    //  archiver.pipe(response);
    //  archiver.finalize();
    //});
    this.exportService.getCsvFiles(req.user.id).then((resp) => {
      resp.pipe(response);
      resp.finalize();
    });
  }
}
