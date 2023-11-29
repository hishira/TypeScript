import { Readable } from 'stream';
import { WritableStream } from './writableStream';
import { ImportEntrySchema } from 'src/schemas/Interfaces/importRequest.interface';

export class ImportRequestStream {
  private reader: Readable;
  private readonly writer: WritableStream = new WritableStream();
  constructor(file: Express.Multer.File) {
    this.reader = Readable.from(file.buffer);
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
