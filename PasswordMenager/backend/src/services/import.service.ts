import { Injectable, Inject } from '@nestjs/common';
import {
  ImportEntrySchema,
  ImportRequest,
  ImportRequestDto,
} from 'src/schemas/Interfaces/importRequest.interface';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
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
  constructor(
    @Inject(Repository)
    private readonly importRequestRepository: Repository<ImportRequest>,
  ) {}
  importEntriesFromFile(file: Express.Multer.File, userid: string) {
    const readableStream = Readable.from(file.buffer);
    const writer = new WritableStream();
    readableStream.pipe(writer);
    return new Promise<any>((resolve, reject) => {
      readableStream.on('end', () => {
        writer.end();
        const numberOfEntries = writer.getSavedData;
        this.importRequestRepository
          .create(new ImportRequestDto(userid, numberOfEntries))
          .then((importRequest) => {
            const response = {
              numberOfEntriesToAdd: numberOfEntries.length,
              entiresToImport: numberOfEntries.slice(0, 10),
              importRequestId: importRequest._id,
            };
            resolve(response);
          })
          .catch((error) => reject(error));
      });
    });
  }
}
