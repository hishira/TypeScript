import { Injectable } from '@nestjs/common';
import { Readable } from 'stream';
import { EntryService } from './entry.service';
import * as Archiver from 'archiver';
import { Response } from 'express';

@Injectable()
export class ExportService {
  constructor(private readonly entryService: EntryService) {}

  getCsvFiles(userId: string): Promise<Archiver.Archiver> {
    const archiver = this.entryService.getByUser(userId).then((resp) => {
      let csvData = [['title', 'password', 'note', '\r\n']];
      resp.forEach((entry) => {
        csvData.push([entry.title, entry.password, entry.note, '\r\n']);
      });
      const readable = new Readable({
        read() {
          this.push(csvData.shift().join(','));
          if (!csvData.length) {
            this.push(null);
          }
        },
        destroy() {
          csvData = null;
        },
      });
      const archiver = Archiver('zip', {
        zlib: { level: 9 },
        forceLocalTime: true,
      });
      archiver.on('error', (err) => console.log(err));
      archiver.append(readable, { name: 'users.csv' });
      return archiver;
      //archiver.finalize();
    });
    return archiver;
  }
}
