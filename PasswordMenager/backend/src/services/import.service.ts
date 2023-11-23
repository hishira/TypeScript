import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateImportRequestCommand } from 'src/commands/importRequest/ImportRequestCreateCommand';
import { GetImportQuery } from 'src/queries/import/getImports.queries';
import {
  ImportDTOMapper,
  ImportEntriesResponse,
  ImportEntrySchema,
  ImportRequest,
  ImportRequestDto,
} from 'src/schemas/Interfaces/importRequest.interface';
import { DTO } from 'src/schemas/dto/object.interface';
import { Paginator } from 'src/utils/paginator';
import { WritableStream } from 'src/utils/writableStream';
import { Readable } from 'stream';

@Injectable()
export class ImportService {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  activateImportRequest(importRequestId: string, userId: string) {
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
    return this.queryBus.execute(new GetImportQuery({ userId: userId }));
  }
  importEntriesFromFile(file: Express.Multer.File, userid: string) {
    const importRequestStream = new ImportRequestStream(file);
    let entries = [];
    return importRequestStream
      .getPromise()
      .then((entryImport) => {
        entries = entryImport;
        return this.commandBus.execute(
          new CreateImportRequestCommand(
            new ImportRequestDto(userid, entryImport),
          ),
        );
      })
      .then((importRequest) => {
        return new ImportEntriesResponse(entries, importRequest)
          .ResponseResolve;
      });
  }
}
//TEST
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
