import { EntryServiceMessage } from 'src/errors/errors-messages/entryServiceMessages';
import { EventTypes } from 'src/events/eventTypes';
import { HistoryAppendEvent } from 'src/events/historyAppendEvent';
import { IEntry } from 'src/schemas/Interfaces/entry.interface';
import { EventAction } from 'src/schemas/Interfaces/event.interface';
import { EventEntryBuilder } from 'src/schemas/utils/builders/event/entryEvent.builder';
import { EntryService } from 'src/services/entry.service';
import { LoggerHandler } from '../../utils/error.handlers';
export class EntryServiceEmitterLogger {
  constructor(
    private readonly entryService: EntryService,
    private readonly logger: LoggerHandler,
    private readonly errorLogger: LoggerHandler,
  ) {}

  deleteActionHandler(
    entryid: string,
    promiseResponse: [IEntry, IEntry[]],
  ): void {
    this.entryService.eventEmitter.emit(
      EventTypes.HistoryAppend,
      new HistoryAppendEvent(
        promiseResponse[0].userid,
        [promiseResponse[0]],
        'entry',
      ),
    );
    this.entryService.eventEmitter.emitAsync(
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

  activateDeletedEntriesLog(): void {
    this.logger.handle(
      'Deleted entries activated sucessfull',
      EntryServiceMessage.ActiveDeleted,
    );
  }
  //TODO: entries type
  historyEntriesAppend(entries: IEntry[]): void {
    if (Array.isArray(entries) && entries.length > 0) {
      this.entryService.eventEmitter.emit(
        EventTypes.HistoryAppend,
        new HistoryAppendEvent(entries[0].userid, entries, 'entry'),
      );
    }
  }

  handleDeleteEntriesByGroup(entries: IEntry[]): void {
    this.logger.handle('Group deleted sucessfull', EntryServiceMessage.Delete);
    this.entryService.eventEmitter.emitAsync(
      EventAction.Create,
      new EventEntryBuilder(null, entries).setMultiDelete().build(),
    );
  }

  handleEntryRestore(entryId: string, restoredEntry): void {
    this.logger.handle(
      `Entry with id = ${entryId} restorect succesfull`,
      EntryServiceMessage.Restore,
    );
    this.entryService.eventEmitter.emitAsync(
      EventAction.Create,
      new EventEntryBuilder(restoredEntry._id, restoredEntry)
        .setRestoreEvent()
        .build(),
    );
  }
}
