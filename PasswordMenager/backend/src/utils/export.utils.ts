import { Cipher, createCipheriv, pbkdf2Sync, randomBytes } from 'crypto';
import { EntryData, IEntry } from 'src/schemas/Interfaces/entry.interface';
import { PaginatorDto } from 'src/utils/paginator';
import { EncryptBuffer } from './encryptBuffer';

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
    return new EncryptBuffer(file.buffer).getDecryptedBuffer('utf8');
  }

  static GenerateValueForEntryptedData(password: string): {
    salt: Buffer;
    iv: Buffer;
    key: Buffer;
  } {
    const salt = randomBytes(16); // Gemerate random salt
    return {
      salt,
      iv: randomBytes(16), // Gemerate random iv
      key: pbkdf2Sync(password, salt, 100000, 32, 'sha256'),
    };
  }

  static GetCipherForEncryptData(key: Buffer, iv: Buffer): Cipher {
    return createCipheriv('aes-256-ocb', key, iv);
  }
  static GetEncryptedDataBuffer(
    entries:
      | IEntry[]
      | {
          data: IEntry[];
          pageInfo: PaginatorDto;
        },
  ): Buffer {
    const passwords = [];
    Array.isArray(entries) &&
      entries.forEach((entry) => passwords.push(entry.password));
    const fileContent = passwords.join(',');
    const password = '123456';
    const { salt, iv, key } =
      ExportCsvUtils.GenerateValueForEntryptedData(password);

    const cipher = ExportCsvUtils.GetCipherForEncryptData(key, iv);
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
