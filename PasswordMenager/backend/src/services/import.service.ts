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
} from 'src/utils/error.handlers';
import { ImportRequestStream } from 'src/utils/importRequest.util';
import { Paginator } from 'src/utils/paginator';
import { ImportServiceEventLogger } from './eventAndLog/importServiceEventLogger';
import { IEntry } from 'src/schemas/Interfaces/entry.interface';

@Injectable()
export class ImportService implements LoggerContext {
  private importServiceEventLogger: ImportServiceEventLogger;
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    readonly logger: Logger,
  ) {
    this.importServiceEventLogger = new ImportServiceEventLogger(
      new LogHandler(this),
      new ErrorHandler(this),
      this.eventEmitter,
    );
  }

  activateImportRequest(
    importRequestId: string,
    userId: string,
  ): Promise<unknown> {
    return this.queryBus
      .execute(new GetImportQuery({ id: importRequestId }))
      .then((importRequest: ImportRequest[]) => {
        const firstImportRequest =
          this.retrieveFirstImportRequest(importRequest);
        this.handleActivateImportRequest(firstImportRequest, userId);
        this.importServiceEventLogger.activeImportRequestSuccessfull(
          firstImportRequest,
        );
        return firstImportRequest;
      })

      .catch((error) =>
        this.importServiceEventLogger.activeImportRequestError(
          importRequestId,
          error,
        ),
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
    // TODO: Check after refactor
    // const importRequestStream = new ImportRequestStream(file, writeType);
    // let entries = [];
    // this.importServiceEventLogger.tryToImportEntries(userid);
    // return importRequestStream
    //   .getPromise()
    //   .then((entryImport) => {
    //     entries = entryImport;
    //     return this.commandBus.execute<
    //       CreateImportRequestCommand,
    //       ImportRequest
    //     >(
    //       new CreateImportRequestCommand(
    //         new ImportRequestDto(userid, entryImport),
    //       ),
    //     );
    //   })
    return this.getImportRequestStreamResult(file, userid, writeType)
      .then(({ entries, importRequest }) => {
        const importEntryResponse = new ImportEntriesResponse(
          entries,
          importRequest,
        ).ResponseResolve;
        this.importServiceEventLogger.importEntriesSuccess(importEntryResponse);

        return importEntryResponse;
      })
      .catch((error) => {
        this.importServiceEventLogger.importEntriesError();
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
        this.importServiceEventLogger.deleteEventLogSuccess(response),
      )
      .catch((error) =>
        this.importServiceEventLogger.deleteEventLogError(error),
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
        this.importServiceEventLogger.editEventLogSuccess(response),
      )
      .catch((error) => this.importServiceEventLogger.editEventLogError(error));
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

  private getImportRequestStreamResult(
    file: Express.Multer.File,
    userid: string,
    writeType: 'csv' | 'json',
  ): Promise<{ importRequest: ImportRequest; entries: IEntry[] }> {
    const importRequestStream = new ImportRequestStream(file, writeType);
    let entries = [];
    this.importServiceEventLogger.tryToImportEntries(userid);
    return importRequestStream
      .getPromise()
      .then((entryImport) => {
        entries = entryImport;
        return this.commandBus.execute<
          CreateImportRequestCommand,
          ImportRequest
        >(
          new CreateImportRequestCommand(
            new ImportRequestDto(userid, entryImport),
          ),
        );
      })
      .then((importRequest) => ({ entries, importRequest }));
  }
}
