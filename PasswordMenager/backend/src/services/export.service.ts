import { Injectable } from '@nestjs/common';
import * as Archiver from 'archiver';
import { CsvFile } from 'src/utils/csv.util';
import { CsvEntry, ExportCsvUtils, ExportReader } from 'src/utils/export.utils';
import { EntryService } from './entry.service';

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
