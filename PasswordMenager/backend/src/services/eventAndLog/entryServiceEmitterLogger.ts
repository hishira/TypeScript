import { EventEmitter2 } from '@nestjs/event-emitter';
import { EntryServiceMessage } from 'src/errors/errors-messages/entryServiceMessages';
import { EventTypes } from 'src/events/eventTypes';
import { HistoryAppendEvent } from 'src/events/historyAppendEvent';
import { IEntry } from 'src/schemas/Interfaces/entry.interface';
import { EventAction } from 'src/schemas/Interfaces/event.interface';
import { EditEntryDto } from 'src/schemas/dto/editentry.dto';
import { EventEntryBuilder } from 'src/schemas/utils/builders/event/entryEvent.builder';
import { LoggerHandler } from '../../utils/error.handlers';
export class EntryServiceEmitterLogger {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly logger: LoggerHandler,
    private readonly errorLogger: LoggerHandler,
  ) {}

  createEntryEventAndLog(entry: IEntry): void {
    this.logger.handle(
      `Entry with ${entry._id} created`,
      EntryServiceMessage.Create,
    );
    this.eventEmitter.emitAsync(
      EventAction.Create,
      new EventEntryBuilder(entry._id, entry).setCreateEvent().build(),
    );
  }

  tryToRestoreLog(): void {
    this.logger.handle(
      EntryServiceMessage.RestoreMessage,
      EntryServiceMessage.Restore,
    );
  }
  deleteActionHandler(
    entryid: string,
    promiseResponse: [IEntry, IEntry[]],
  ): void {
    this.eventEmitter.emit(
      EventTypes.HistoryAppend,
      new HistoryAppendEvent(
        promiseResponse[0].userid,
        [promiseResponse[0]],
        'entry',
      ),
    );
    this.eventEmitter.emitAsync(
      EventAction.Create,
      new EventEntryBuilder(promiseResponse[0]._id, promiseResponse[0])
        .setDeleteEvent()
        .build(),
    );
    this.logger.handle(
      `Entry with id = ${entryid} deleted succesfull`,
      EntryServiceMessage.Delete,
    );
  }

  errorDeleteByid(): void {
    this.errorLogger.handle(
      EntryServiceMessage.DeleteMessage,
      EntryServiceMessage.Delete,
    );
  }

  handleDeleteByGroupError<T>(error: T): T {
    this.errorLogger.handle(error, EntryServiceMessage.Delete);

    return error;
  }

  activateDeletedEntriesLog(): void {
    this.logger.handle(
      'Deleted entries activated sucessfull',
      EntryServiceMessage.ActiveDeleted,
    );
  }
  //TODO: entries type
  historyEntriesAppend(entries: IEntry[]): void {
    if (Array.isArray(entries) && entries.length > 0) {
      this.eventEmitter.emit(
        EventTypes.HistoryAppend,
        new HistoryAppendEvent(entries[0].userid, entries, 'entry'),
      );
    }
  }

  handleDeleteEntriesByGroup(entries: IEntry[]): void {
    this.logger.handle('Group deleted sucessfull', EntryServiceMessage.Delete);
    this.eventEmitter.emitAsync(
      EventAction.Create,
      new EventEntryBuilder(null, entries).setMultiDelete().build(),
    );
  }

  handleEntryRestore(entryId: string, restoredEntry): void {
    this.logger.handle(
      `Entry with id = ${entryId} restorect succesfull`,
      EntryServiceMessage.Restore,
    );
    this.eventEmitter.emitAsync(
      EventAction.Create,
      new EventEntryBuilder(restoredEntry._id, restoredEntry)
        .setRestoreEvent()
        .build(),
    );
  }

  editEntryEventLog(neweditedentry: EditEntryDto): void {
    this.logger.handle(
      `Entry with id = ${neweditedentry._id} edited succesfull`,
      EntryServiceMessage.Update,
    );
    this.eventEmitter.emitAsync(
      EventAction.Create,
      new EventEntryBuilder(neweditedentry._id, neweditedentry)
        .setEditEvent()
        .build(),
    );
  }

  editEntryEventLogError<T>(error: T, neweditedentry: EditEntryDto): void {
    this.errorLogger.handle(error, EntryServiceMessage.Update);
    this.eventEmitter.emitAsync(
      EventAction.Create,
      new EventEntryBuilder(neweditedentry._id, neweditedentry)
        .setEditEvent()
        .build(),
    );
  }
}
