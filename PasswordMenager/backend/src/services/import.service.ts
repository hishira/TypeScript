import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  ImportDTOMapper,
  ImportEntriesResponse,
  ImportRequest,
  ImportRequestDto,
} from 'src/schemas/Interfaces/importRequest.interface';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { DTO } from 'src/schemas/dto/object.interface';
import { Paginator } from 'src/utils/paginator';
import { WritableStream } from 'src/utils/writableStream';
import { Readable } from 'stream';

@Injectable()
export class ImportService {
  constructor(
    @Inject(Repository)
    private readonly importRequestRepository: Repository<ImportRequest>,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  activateImportRequest(importRequestId: string, userId: string) {
    return this.importRequestRepository
      .findById(importRequestId)
      .then((importRequest) => {
        const entriesToImport = importRequest.entriesToImport;
        const dtosObjects: DTO[] = ImportDTOMapper.MapImportRequestsToDTOs(
          userId,
          entriesToImport,
        );
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
            resolve(
              new ImportEntriesResponse(numberOfEntries, importRequest)
                .ResponseResolve,
            );
          })
          .catch((error) => reject(error));
      });
    });
  }
}
