import { ImportEntrySchema } from 'src/schemas/Interfaces/importRequest.interface';
import { Readable } from 'stream';
import { WritableStream } from './writableStream';

export class ImportRequestStream {
  private reader: Readable;
  private readonly writer: WritableStream; // = new WritableStream(this.writeType);
  constructor(
    file: Express.Multer.File,
    public writeType: 'csv' | 'json' = 'csv',
  ) {
    this.reader = Readable.from(file.buffer);
    this.writer = new WritableStream(this.writeType);
    this.reader.pipe(this.writer);
  }

  getPromise(): Promise<ImportEntrySchema[]> {
    return new Promise<ImportEntrySchema[]>((resolve, reject) => {
      this.reader.on('end', () => {
        try {
          this.writer.end();
          const importEntriesSchema = this.writer.getSavedData;
          resolve(importEntriesSchema);
        } catch (e) {
          reject(e);
        }
      });
    });
  }
}
