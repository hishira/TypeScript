import { createDecipheriv, pbkdf2Sync } from 'crypto';
import { EntryData, IEntry } from 'src/schemas/Interfaces/entry.interface';
import { Readable } from 'stream';

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
export class ExportCsvUtils {
  static GetConcatedCsvArray(
    csvToConat: string[][],
    entries: IEntry[] | EntryData,
  ): string[][] {
    return Array.isArray(entries)
      ? csvToConat.concat(entries.map(ExportCsvUtils.MapEntryToCSVRow))
      : csvToConat;
  }

  static MapEntryToCSVRow(entry: IEntry): string[] {
    return [entry.title, entry.password, entry.note, '\r\n'];
  }

  static GetEncryptedValueFromFile(file: Express.Multer.File): string {
    const buffer = Buffer.from(file.buffer);
    const salt = buffer.slice(0, 16);
    const iv = buffer.slice(16, 32);
    const encryptedContent = buffer.slice(32);
    const key = pbkdf2Sync('123456', salt, 100000, 32, 'sha256');
    const decipher = createDecipheriv('aes-256-cbc', key, iv);
    const decryptedContent = Buffer.concat([
      decipher.update(encryptedContent),
      decipher.final(),
    ]);
    return decryptedContent.toString('utf-8');
  }
}
