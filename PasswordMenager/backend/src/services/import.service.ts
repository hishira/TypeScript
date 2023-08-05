import { Injectable, Inject } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  ImportEntrySchema,
  ImportRequest,
  ImportRequestDto,
} from 'src/schemas/Interfaces/importRequest.interface';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { DTO } from 'src/schemas/dto/object.interface';
import { Paginator } from 'src/utils/paginator';
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
    private readonly eventEmitter: EventEmitter2,
  ) {}

  activateImportRequest(importRequestId: string) {
    return this.importRequestRepository
      .findById(importRequestId)
      .then((importRequest) => {
        const entriesToImport = importRequest.entriesToImport;
        const dtosObjects: DTO[] = entriesToImport.map((entry) => ({
          toObject: () => ({
            title: entry.title,
            password: entry.password,
            username: entry.username,
            note: entry.email,
          }),
        }));
        this.eventEmitter.emitAsync('entry.insertMany', {
          objects: dtosObjects,
        });
      });
  }

  getUserImportRequest(userId: string): Promise<
    | ImportRequest[]
    | {
        data: ImportRequest[];
        pageInfo: Paginator;
      }
  > {
    return this.importRequestRepository.find({
      getOption: () => ({ userid: userId }),
    });
  }
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
