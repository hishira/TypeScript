import { Injectable } from '@nestjs/common';
import * as Archiver from 'archiver';
import { CsvFile } from 'src/utils/csv.util';
import { ExportCsvUtils } from 'src/utils/export.utils';
import { EntryService } from './entry.service';
import { ExportReader } from 'src/utils/exportReader';
import { CsvEntry } from 'src/utils/csvEntry';

const EntryToCsvEntryMapper = (entryResponse): CsvEntry[] => {
  const csvRows: CsvEntry[] = Array.isArray(entryResponse)
    ? entryResponse.map(
        (entry) =>
          new CsvEntry(entry.title, entry.username, entry.password, entry.note),
      )
    : [];
  return csvRows;
};
@Injectable()
export class ExportService {
  private archiverOption = {
    zlib: { level: 9 },
    forceLocalTime: true,
  };

  constructor(private readonly entryService: EntryService) {}

  getCsvFile(userId): Promise<string> {
    return this.entryService.getByUser(userId).then((resp) => {
      const csvRows: CsvEntry[] = EntryToCsvEntryMapper(resp);
      const csv = new CsvFile(CsvFile.DefaultCsvHeader)
        .setRows(csvRows)
        .getCsvAsString();
      return csv;
    });
  }
  getCsvZipedFile(userId: string): Promise<Archiver.Archiver> {
    const archiver = this.entryService.getByUser(userId).then((resp) => {
      let csvData = [['title', 'password', 'note', '\r\n']];
      csvData = ExportCsvUtils.GetConcatedCsvArray(csvData, resp);
      const readable = new ExportReader(csvData);

      const archiver = Archiver('zip', this.archiverOption);
      archiver.on('error', (err) => console.error(err));
      archiver.append(readable, { name: 'users.csv' });
      return archiver;
    });
    return archiver;
  }
}
