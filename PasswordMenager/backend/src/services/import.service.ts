import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateImportRequestCommand } from 'src/commands/importRequest/ImportRequestCreateCommand';
import { ImportRequestDeleteCommand } from 'src/commands/importRequest/ImportRequestDeleteCommand';
import { ImportRequestEditCommand } from 'src/commands/importRequest/ImportRequestEditCommand';
import { EventTypes } from 'src/events/eventTypes';
import { InsertmanyEntryEvent } from 'src/events/insertManyEntryEvent';
import { GetImportQuery } from 'src/queries/import/getImports.queries';
import {
  ImportEntriesResponse,
  ImportEntryResponse,
} from 'src/response/importEntries.response';
import { ImportRequest } from 'src/schemas/Interfaces/importRequest.interface';
import { EditImportRequest } from 'src/schemas/dto/editImportRequest.dto';
import { ImportRequestDto } from 'src/schemas/dto/importRequest.dto';
import { DTO } from 'src/schemas/dto/object.interface';
import { ImportRequestState } from 'src/schemas/importRequest.schema';
import { ImportDTOMapper } from 'src/schemas/mapper/importDtoMapper';
import { Logger } from 'src/utils/Logger';
import {
  ErrorHandler,
  LogHandler,
  LoggerContext,
  LoggerHandler,
} from 'src/utils/error.handlers';
import { ImportRequestStream } from 'src/utils/importRequest.util';
import { Paginator } from 'src/utils/paginator';

enum ImportServiceMessage {
  Activate = 'ImportService; activateImportRequest method',
  ActivateError = 'Activate importrequest not pass',
  ActivateSuccess = 'Activate importrequest pass',
  TryToImport = 'Try to import entries for user = ',
  ImportEntriesFile = 'ImportService; importEntriesFromFile method',
  ImportEntriesFilePass = 'Import entries from file pass',
  ImportEntriesFail = 'Import entries from file fail',
  Delete = 'ImportService: deleteImportRequest method',
  Update = 'ImportService: editImpoerRequest method',
}

@Injectable()
export class ImportService implements LoggerContext {
  logHandler: LoggerHandler = new LogHandler(this);
  errorHandler: LoggerHandler = new ErrorHandler(this);
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    readonly logger: Logger,
  ) {}

  activateImportRequest(
    importRequestId: string,
    userId: string,
  ): Promise<boolean> {
    return this.queryBus
      .execute(new GetImportQuery({ id: importRequestId }))
      .then((importRequest: ImportRequest[]) =>
        this.retrieveFirstImportRequest(importRequest),
      )
      .then((importRequest) => {
        this.handleActivateImportRequest(importRequest, userId);
        return true;
      })
      .then((response) =>
        this.logHandler.handle(response, ImportServiceMessage.Activate),
      )
      .catch((error) =>
        this.errorHandler.handle(error, ImportServiceMessage.Activate),
      );
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
  ): Promise<ImportEntryResponse> {
    const importRequestStream = new ImportRequestStream(file, writeType);
    let entries = [];
    this.logHandler.handle(
      ImportServiceMessage.TryToImport + userid,
      ImportServiceMessage.ImportEntriesFile,
    );
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
      })
      .then((response) => {
        this.logHandler.handle(
          ImportServiceMessage.ImportEntriesFilePass,
          ImportServiceMessage.ImportEntriesFile,
        );
        return response;
      })
      .catch((error) => {
        this.logHandler.handle(
          ImportServiceMessage.ImportEntriesFail,
          ImportServiceMessage.ImportEntriesFile,
        );
        return error;
      });
  }

  deleteImportRequest(importRequestId: string): Promise<ImportRequest> {
    return this.commandBus
      .execute(
        new ImportRequestDeleteCommand({
          _id: importRequestId,
          state: ImportRequestState.Deleted,
        }),
      )
      .then((response) =>
        this.logHandler.handle(response, ImportServiceMessage.Delete),
      )
      .catch((error) =>
        this.errorHandler.handle(error, ImportServiceMessage.Delete),
      );
  }

  editImpoerRequest(
    importRequestId: string,
    editImportRequestDto: EditImportRequest,
  ): Promise<ImportRequest> {
    return this.commandBus
      .execute(
        new ImportRequestEditCommand({
          _id: importRequestId,
          ...editImportRequestDto,
        }),
      )
      .then((response) =>
        this.logHandler.handle(response, ImportServiceMessage.Update),
      )
      .catch((error) =>
        this.errorHandler.handle(error, ImportServiceMessage.Update),
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
  ): void {
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
