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
export class CsvEntry {
  constructor(
    public title: string,
    public username: string,
    public password: string,
    public note: string,
  ) {}

  toString(): string {
    return `${this.title}, ${this.username}, ${this.password}, ${this.note}`;
  }
}
@Injectable()
export class ExportService {
  private archiverOption = {
    zlib: { level: 9 },
    forceLocalTime: true,
  };

  constructor(private readonly entryService: EntryService) {}

  getCsvFile(userId): Promise<string> {
    return this.entryService.getByUser(userId).then((resp) => {
      const csvRows: CsvEntry[] = Array.isArray(resp)
        ? resp.map(
            (entry) =>
              new CsvEntry(
                entry.title,
                entry.username,
                entry.password,
                entry.note,
              ),
          )
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

      const archiver = Archiver('zip', this.archiverOption);
      archiver.on('error', (err) => console.error(err));
      archiver.append(readable, { name: 'users.csv' });
      return archiver;
    });
    return archiver;
  }
}
