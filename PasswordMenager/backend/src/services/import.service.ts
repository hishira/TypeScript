import { Injectable } from '@nestjs/common';
import { ImportEntrySchema } from 'src/schemas/Interfaces/importRequest.interface';
import { Readable, Writable } from 'stream';

type ToString = {
  toString: () => string;
};
class WritableStream extends Writable {
  get getSavedData(): ImportEntrySchema[] {
    return this.data;
  }
  constructor(
    private readonly data: ImportEntrySchema[] = [],
    public readonly separator: string = ',',
  ) {
    super();
  }
  _write(
    chunk: ToString,
    encoding: BufferEncoding,
    callback: (error?: Error) => void,
  ): void {
    const fileContentAsString = chunk.toString();
    const fileRows = fileContentAsString.split('\r\n');
    fileRows.forEach((csvRow) => {
      const values = csvRow.split(this.separator);
      const [name, username, password, note] = values;
      this.data.push(new ImportEntrySchema(password, username, name, note, ''));
    });
    callback();
  }
}
@Injectable()
export class ImportService {
  importEntriesFromFile(file: Express.Multer.File) {
    const readableStream = Readable.from(file.buffer);
    const writer = new WritableStream();
    readableStream.pipe(writer);
    return new Promise<ImportEntrySchema[]>((resolve, reject) => {
      readableStream.on('end', () => {
        writer.end();
        resolve(writer.getSavedData);
      });
    });
  }
}