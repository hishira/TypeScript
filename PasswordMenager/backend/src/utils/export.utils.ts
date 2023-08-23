import {
  createCipheriv,
  createDecipheriv,
  pbkdf2Sync,
  randomBytes,
} from 'crypto';
import { EntryData, IEntry } from 'src/schemas/Interfaces/entry.interface';
import { Readable } from 'stream';
import { PaginatorDto } from 'src/utils/paginator';

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
    ////TODO: Move to seperate class, not has anything common with csv
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

  static GetEncryptedDataBuffer(
    entries:
      | IEntry[]
      | {
          data: IEntry[];
          pageInfo: PaginatorDto;
        },
  ): Buffer {
    //TODO: Move to seperate class, not has anything common with csv,
    const passwords = [];
    Array.isArray(entries) &&
      entries.forEach((entry) => passwords.push(entry.password));
    const fileContent = passwords.join(',');
    const password = '123456';
    const salt = randomBytes(16); // Generate a random salt

    const key = pbkdf2Sync(password, salt, 100000, 32, 'sha256');
    const iv = randomBytes(16); // Generate a random IV

    const cipher = createCipheriv('aes-256-cbc', key, iv);
    let encryptedContent = cipher.update(fileContent, 'utf8', 'hex');
    encryptedContent += cipher.final('hex');
    // Save salt and iv in file
    const encryptedData = Buffer.concat([
      salt,
      iv,
      Buffer.from(encryptedContent, 'hex'),
    ]);
    return encryptedData;
  }
}
