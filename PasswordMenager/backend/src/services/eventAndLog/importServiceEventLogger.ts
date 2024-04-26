import { EventEmitter2 } from '@nestjs/event-emitter';
import { ImportEntryResponse } from 'src/response/importEntries.response';
import { EventAction } from 'src/schemas/Interfaces/event.interface';
import { ImportRequest } from 'src/schemas/Interfaces/importRequest.interface';
import { ImportRequestEventBuilder } from 'src/schemas/utils/builders/event/importRequestEvent.builder';
import { LoggerHandler } from 'src/utils/error.handlers';
import { ImportServiceMessage } from 'src/errors/errors-messages/importRequestErrorMessages';

export class ImportServiceEventLogger {
  constructor(
    private readonly logHandler: LoggerHandler,
    private readonly errorHandler: LoggerHandler,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  activeImportRequestSuccessfull(response: ImportRequest): ImportRequest {
    this.logHandler.handle(response, ImportServiceMessage.Activate);
    this.eventEmitter.emitAsync(
      EventAction.Create,
      new ImportRequestEventBuilder(response._id, response)
        .setActivateImportRequestEvent()
        .build(),
    );
    return response;
  }

  activeImportRequestError(importRequestid, error: any): any {
    this.errorHandler.handle(error, ImportServiceMessage.Activate);
    this.eventEmitter.emitAsync(
      EventAction.Create,
      new ImportRequestEventBuilder(importRequestid, {})
        .setActivateImportRequestEvent()
        .build(),
    );

    return error;
  }

  tryToImportEntries(userid: string): void {
    this.logHandler.handle(
      ImportServiceMessage.TryToImport + userid,
      ImportServiceMessage.ImportEntriesFile,
    );
  }

  importEntriesSuccess(importEntryResponse: ImportEntryResponse): void {
    this.logHandler.handle(
      ImportServiceMessage.ImportEntriesFilePass,
      ImportServiceMessage.ImportEntriesFile,
    );
    this.eventEmitter.emitAsync(
      EventAction.Create,
      new ImportRequestEventBuilder(
        importEntryResponse.importRequestId,
        importEntryResponse,
      )
        .setImportRequestEvent()
        .build(),
    );
  }

  importEntriesError(): void {
    this.logHandler.handle(
      ImportServiceMessage.ImportEntriesFail,
      ImportServiceMessage.ImportEntriesFile,
    );
    this.eventEmitter.emitAsync(
      EventAction.Create,
      new ImportRequestEventBuilder(null, null).setImportRequestEvent().build(),
    );
  }

  deleteEventLogSuccess<T extends { id: string }>(response: T): T {
    this.logHandler.handle(response, ImportServiceMessage.Delete);
    this.eventEmitter.emitAsync(
      EventAction.Create,
      new ImportRequestEventBuilder(response?.id ?? null, response)
        .setDeleteEvent()
        .build(),
    );

    return response;
  }

  deleteEventLogError<T>(response: T): T {
    this.logHandler.handle(response, ImportServiceMessage.Delete);
    this.eventEmitter.emitAsync(
      EventAction.Create,
      new ImportRequestEventBuilder(null, response).setDeleteEvent().build(),
    );

    return response;
  }

  editEventLogSuccess<T extends { id: string }>(response: T): T {
    this.logHandler.handle(response, ImportServiceMessage.Update);
    this.eventEmitter.emitAsync(
      EventAction.Create,
      new ImportRequestEventBuilder(response?.id, response)
        .setEditEvent()
        .build(),
    );

    return response;
  }

  editEventLogError<T>(response: T): T {
    this.logHandler.handle(response, ImportServiceMessage.Update);
    this.eventEmitter.emitAsync(
      EventAction.Create,
      new ImportRequestEventBuilder(null, response).setEditEvent().build(),
    );

    return response;
  }
}
