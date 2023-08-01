import { Injectable } from '@nestjs/common';
import * as Archiver from 'archiver';
import { CsvFile } from 'src/utils/csv.util';
import { Readable } from 'stream';
import { EntryService } from './entry.service';

export class ExportReader extends Readable {
  constructor(public csvData: string[][]) {
    super();
  }
  override _read(size?: number) {
    this.push(this.csvData.shift()?.join(','));
    if (!this.csvData.length) {
      this.push(null);
    }
  }
  override _destroy() {
    this.csvData = null;
    return this;
  }
}
@Injectable()
export class ExportService {
  constructor(private readonly entryService: EntryService) {}

  getCsvFile(userId): Promise<string> {
    // REfactor, check
    return this.entryService.getByUser(userId).then((resp) => {
      const csvRows: string[][] = Array.isArray(resp)
        ? resp.map((entry) => [
            entry.title,
            entry.username,
            entry.password,
            entry.note,
          ])
        : [];
      const csv = new CsvFile(CsvFile.DefaultCsvHeader)
        .setRows(csvRows)
        .getCsvAsString();
      return csv;
    });
  }
  getCsvZipedFile(userId: string): Promise<Archiver.Archiver> {
    //TODO: Refactor check if work
    const archiver = this.entryService.getByUser(userId).then((resp) => {
      let csvData = [['title', 'password', 'note', '\r\n']];
      csvData = Array.isArray(resp)
        ? csvData.concat(
            resp.map((entry) => [
              entry.title,
              entry.password,
              entry.note,
              '\r\n',
            ]),
          )
        : csvData;
      const readable = new ExportReader(csvData);

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
