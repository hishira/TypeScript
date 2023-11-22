import { Inject, Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { GetImportQuery } from 'src/queries/import/getImports.queries';
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
    private readonly queryBus: QueryBus,
  ) {}

  activateImportRequest(importRequestId: string, userId: string) {
    // return this.importRequestRepository
    //   .findById(importRequestId)
    return this.queryBus
      .execute(new GetImportQuery({ id: importRequestId }))
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
    // return this.importRequestRepository.find({
    //   getOption: () => ({ userid: userId }),
    // });
    return this.queryBus.execute(new GetImportQuery({ userId: userId }));
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
