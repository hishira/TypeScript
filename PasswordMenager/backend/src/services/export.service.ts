import { Injectable } from '@nestjs/common';
import * as Archiver from 'archiver';
import { EntryData, IEntry } from 'src/schemas/Interfaces/entry.interface';
import { Logger } from 'src/utils/Logger';
import { CsvFile } from 'src/utils/csv.util';
import { CsvEntry } from 'src/utils/csvEntry';
import {
  ErrorHandler,
  LogHandler,
  LoggerContext,
  LoggerHandler,
} from 'src/utils/error.handlers';
import { ExportCsvUtils } from 'src/utils/export.utils';
import { ExportReader } from 'src/utils/exportReader';
import { EntryService } from './entry.service';

const EntryToCsvEntryMapper = (entryResponse): CsvEntry[] => {
  const csvRows: CsvEntry[] = Array.isArray(entryResponse)
    ? entryResponse.map(
        (entry) =>
          new CsvEntry(entry.title, entry.username, entry.password, entry.note),
      )
    : [];
  return csvRows;
};
enum ExportServiceMessage {
  CsvFile = 'Export service; getCsvFile method',
  JSONFile = 'Export service; getJsonFile method',
  JSONFileMessage = 'Prepare to get JSON file',
  JSONGeneratedFileMessage = 'Generated JSON file',
}
@Injectable()
export class ExportService implements LoggerContext {
  private archiverOption = {
    zlib: { level: 9 },
    forceLocalTime: true,
  };

  readonly logHandler: LoggerHandler = new LogHandler(this);
  readonly errorHandler: LoggerHandler = new ErrorHandler(this);
  constructor(
    private readonly entryService: EntryService,
    readonly logger: Logger,
  ) {}

  getCsvFile(userId): Promise<string> {
    this.logHandler.handle(
      `Prepare csv file for user = ${userId}`,
      ExportServiceMessage.CsvFile,
    );
    return this.entryService
      .getByUser(userId, 100000)
      .then((resp) => this.prepareCsvAndLogHandle(userId, resp));
  }

  getJsonFile(userId): Promise<IEntry[]> {
    this.logHandler.handle(
      ExportServiceMessage.JSONFileMessage + ` id = ${userId}`,
      ExportServiceMessage.JSONFile,
    );
    return this.entryService.getByUser(userId, 100000).then((resp) => {
      this.logHandler.handle(
        ExportServiceMessage.JSONGeneratedFileMessage,
        ExportServiceMessage.JSONFile,
      );
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

  private prepareCsvAndLogHandle(
    userId: string,
    resp: IEntry[] | EntryData,
  ): string {
    const csvRows: CsvEntry[] = EntryToCsvEntryMapper(
      'data' in resp ? resp?.data : resp,
    );
    const csv = new CsvFile(CsvFile.DefaultCsvHeader)
      .setRows(csvRows)
      .getCsvAsString();
    this.logHandler.handle(
      `Csv file send for user id = ${userId}`,
      ExportServiceMessage.CsvFile,
    );
    return csv;
  }
}
