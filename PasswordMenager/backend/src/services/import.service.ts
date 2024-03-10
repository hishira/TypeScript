import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateImportRequestCommand } from 'src/commands/importRequest/ImportRequestCreateCommand';
import { ImportRequestDeleteCommand } from 'src/commands/importRequest/ImportRequestDeleteCommand';
import { ImportRequestEditCommand } from 'src/commands/importRequest/ImportRequestEditCommand';
import { EventTypes } from 'src/events/eventTypes';
import { InsertmanyEntryEvent } from 'src/events/insertManyEntryEvent';
import { GetImportQuery } from 'src/queries/import/getImports.queries';
import { ImportEntriesResponse } from 'src/response/importEntries.response';
import { ImportRequest } from 'src/schemas/Interfaces/importRequest.interface';
import { EditImportRequest } from 'src/schemas/dto/editImportRequest.dto';
import { ImportRequestDto } from 'src/schemas/dto/importRequest.dto';
import { DTO } from 'src/schemas/dto/object.interface';
import { ImportRequestState } from 'src/schemas/importRequest.schema';
import { ImportDTOMapper } from 'src/schemas/mapper/importDtoMapper';
import { ImportRequestStream } from 'src/utils/importRequest.util';
import { Paginator } from 'src/utils/paginator';

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
      .then((importRequest: ImportRequest[]) =>
        this.retrieveFirstImportRequest(importRequest),
      )
      .then((importRequest) => {
        this.handleActivateImportRequest(importRequest, userId);
        return true;
      });
  }

  getUserImportRequest(userId: string): Promise<
    | ImportRequest[]
    | {
        data: ImportRequest[];
        pageInfo: Paginator;
      }
  > {
    return this.queryBus.execute(
      new GetImportQuery({ userId: userId, state: ImportRequestState.Active }),
    );
  }
  importEntriesFromFile(
    file: Express.Multer.File,
    userid: string,
    writeType: 'csv' | 'json',
  ) {
    const importRequestStream = new ImportRequestStream(file, writeType);
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

  deleteImportRequest(importRequestId: string) {
    return this.commandBus.execute(
      new ImportRequestDeleteCommand({
        _id: importRequestId,
        state: ImportRequestState.Deleted,
      }),
    );
  }

  editImpoerRequest(
    importRequestId: string,
    editImportRequestDto: EditImportRequest,
  ) {
    return this.commandBus.execute(
      new ImportRequestEditCommand({
        _id: importRequestId,
        ...editImportRequestDto,
      }),
    );
  }

  private retrieveFirstImportRequest(
    importRequest: ImportRequest[],
  ): ImportRequest {
    if (Array.isArray(importRequest)) return importRequest.find(Boolean);
    return importRequest;
  }

  private handleActivateImportRequest(
    importRequest: ImportRequest,
    userId: string,
  ) {
    const entriesToImport = importRequest.entriesToImport;
    const dtosObjects: DTO[] = ImportDTOMapper.MapImportRequestsToDTOs(
      userId,
      entriesToImport,
    );
    this.eventEmitter.emitAsync(
      EventTypes.InsertManyEntry,
      new InsertmanyEntryEvent(dtosObjects),
    );
  }
}
