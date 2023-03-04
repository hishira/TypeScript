import { Injectable } from '@nestjs/common';
import * as Archiver from 'archiver';
import { CsvFile, DefaultCsvHeader } from 'src/utils/csv.util';
import { Readable } from 'stream';
import { EntryService } from './entry.service';

@Injectable()
export class ExportService {
  constructor(private readonly entryService: EntryService) {}

  getCsvFile(userId): Promise<string> {
    return this.entryService.getByUser(userId).then((resp) => {
      const csvRows: string[][] = [];
      resp.forEach((entry) => {
        csvRows.push([
          entry.title,
          entry.username,
          entry.password,
          entry.note,
          '\r\n',
        ]);
      });
      const csv = new CsvFile(DefaultCsvHeader())
        .setRows(csvRows)
        .getCsvAsString();
      return csv;
    });
  }
  getCsvZipedFile(userId: string): Promise<Archiver.Archiver> {
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
      archiver.on('error', (err) => console.error(err));
      archiver.append(readable, { name: 'users.csv' });
      return archiver;
    });
    return archiver;
  }
}
