import { Injectable } from '@nestjs/common';
import * as Archiver from 'archiver';
import { CsvFile } from 'src/utils/csv.util';
import { CsvEntry } from 'src/utils/csvEntry';
import { ExportCsvUtils } from 'src/utils/export.utils';
import { ExportReader } from 'src/utils/exportReader';
import { EntryService } from './entry.service';
import { IEntry } from 'src/schemas/Interfaces/entry.interface';

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
    return this.entryService.getByUser(userId, 100000).then((resp) => {
      const csvRows: CsvEntry[] = EntryToCsvEntryMapper(
        'data' in resp ? resp?.data : resp,
      );
      const csv = new CsvFile(CsvFile.DefaultCsvHeader)
        .setRows(csvRows)
        .getCsvAsString();
      return csv;
    });
  }

  getJsonFile(userId): Promise<IEntry[]> {
    return this.entryService.getByUser(userId, 100000).then((resp) => {
      return 'data' in resp ? resp.data : resp;
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

  async getEncryptedFile(userId: string): Promise<Buffer> {
    const entries = await this.entryService.getByUser(userId);
    return ExportCsvUtils.GetEncryptedDataBuffer(entries);
  }
}
