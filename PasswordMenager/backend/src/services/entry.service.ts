import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { CreateEntryBulkCommand } from 'src/commands/entry/CreateEntryBulkCommand';
import { CreateEntryCommand } from 'src/commands/entry/CreateEntryCommand';
import { DeleteEntryCommand } from 'src/commands/entry/DeleteEntryCommand';
import { UpdateEntryCommand } from 'src/commands/entry/UpdateEntryCommand';
import { DeleteByGroupEvent } from 'src/events/deleteEntryByGroupEvent';
import { EventTypes } from 'src/events/eventTypes';
import { HistoryAppendEvent } from 'src/events/historyAppendEvent';
import { InsertmanyEntryEvent } from 'src/events/insertManyEntryEvent';
import { FindEntryInput } from 'src/handlers/queries/entry/entriesFindInput';
import { GetSpecificEntry } from 'src/queries/entry/getSpecificEntry.queries';
import { EmptyResponse } from 'src/response/empty.response';
import { EventAction } from 'src/schemas/Interfaces/event.interface';
import { CreateEntryDto } from 'src/schemas/dto/createentry.dto';
import { EventEntryBuilder } from 'src/schemas/utils/builders/event/entryEvent.builder';
import { Logger } from 'src/utils/Logger';
import {
  ErrorHandler,
  LogHandler,
  LoggerContext,
  LoggerHandler,
} from 'src/utils/error.handlers';
import {
  EntryData,
  EntryState,
  IEntry,
} from '../schemas/Interfaces/entry.interface';
import { EditEntryDto } from './../schemas/dto/editentry.dto';

enum EntryServiceMessage {
  Create = 'Entry service: create method',
  RestoreMessage = 'Try to restore entry',
  Restore = 'Entry service: restore method',
  Delete = 'Entry service: delete method',
  DeleteMessage = 'Delete entry not possible, error occur',
  Update = 'Entry service: update method',
  ActiveDeleted = 'Entry service: activateDeletedEntreis method',
}
//TODO: Temporary fix, for event catcher
// Fix class length
@Injectable()
export class EntryEmitService {
  constructor(private readonly commandBus: CommandBus) {}

  @OnEvent(EventTypes.InsertManyEntry, { async: true })
  insertMany(payload: InsertmanyEntryEvent): Promise<IEntry[]> {
    return this.commandBus.execute(new CreateEntryBulkCommand(payload.dtos));
  }
}
@Injectable()
export class EntryService implements LoggerContext {
  private logHandler: LoggerHandler = new LogHandler(this);
  private errorHandler: LoggerHandler = new ErrorHandler(this);
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    readonly logger: Logger,
  ) {}

  create(
    entrycreateDTO: CreateEntryDto,
    userid: string,
  ): Promise<IEntry | { message: string }> {
    return this.commandBus
      .execute(new CreateEntryCommand(userid, entrycreateDTO))
      .then((entry) => {
        this.logHandler.handle(
          `Entry with ${entry._id} created`,
          EntryServiceMessage.Create,
        );
        this.eventEmitter.emitAsync(
          EventAction.Create,
          new EventEntryBuilder(entry._id, entry).setCreateEvent().build(),
        );
        return entry;
      });
  }

  @OnEvent(EventTypes.DeleteEntryByGroup, { async: true })
  deleteByGroupEvent(payload: DeleteByGroupEvent): Promise<unknown> {
    return this.deleteByGroup(payload.groupId);
  }

  getById(entryId: string): Promise<IEntry> {
    return this.queryBus.execute(new GetSpecificEntry({ id: entryId }));
  }

  getUserEntriesBy(
    userid: string,
    input?: FindEntryInput,
  ): Promise<IEntry[] | EntryData> {
    return this.queryBus
      .execute(new GetSpecificEntry({ userId: userid, ...input }))
      .then((resp) => {
        return resp ?? [];
      });
  }

  restoreEntry(restoreBody: { entryId: string }): Promise<IEntry> {
    this.logHandler.handle(
      EntryServiceMessage.RestoreMessage,
      EntryServiceMessage.Restore,
    );
    return this.commandBus
      .execute(
        new UpdateEntryCommand({
          id: restoreBody.entryId,
          entryState: EntryState.ACTIVE,
        }),
      )
      .then((restoredEntry) => {
        this.logHandler.handle(
          `Entry with id = ${restoreBody.entryId} restorect succesfull`,
          EntryServiceMessage.Restore,
        );
        return restoredEntry;
      });
  }

  deletebyid(entryid: string): Promise<DeleteEntryResponse<IEntry>> {
    try {
      return Promise.all(this.prepareDeletedEntryPromise(entryid))
        .then((res) => {
          this.eventEmitter.emit(
            EventTypes.HistoryAppend,
            new HistoryAppendEvent(res[0].userid, [res[0]], 'entry'),
          );
          this.logHandler.handle(
            `Entry with id = ${entryid} deleted succesfull`,
            EntryServiceMessage.Delete,
          );
          return { status: true, response: res[0] } as any;
        })
        .catch((_err) => {
          this.errorHandler.handle(
            EntryServiceMessage.DeleteMessage,
            EntryServiceMessage.Delete,
          );
          return EmptyResponse;
        });
    } catch (e) {
      this.errorHandler.handle(
        EntryServiceMessage.DeleteMessage,
        EntryServiceMessage.Delete,
      );
      return Promise.resolve(EmptyResponse);
    }
  }

  getLastDeletedUserEntries(userid: string): Promise<IEntry[] | EntryData> {
    return this.queryBus.execute(
      new GetSpecificEntry({
        userId: userid,
        entryState: EntryState.DELETED,
        limit: 10,
      }),
    );
  }

  activateDeletedEntreis(entryId: string): Promise<IEntry[]> {
    return this.commandBus
      .execute(
        new UpdateEntryCommand({
          id: entryId,
          entryState: EntryState.ACTIVE,
        }),
      )
      .then((respnse) => {
        this.logHandler.handle(
          'Deleted entries activated sucessfull',
          EntryServiceMessage.ActiveDeleted,
        );
        return respnse;
      });
  }

  getByUser(userId: string, limit?: number): Promise<IEntry[] | EntryData> {
    return this.queryBus.execute(
      new GetSpecificEntry({ userId: userId, limit: limit }),
    );
  }

  editentry(neweditedentry: EditEntryDto): Promise<EditEntryResponse<IEntry>> {
    try {
      return this.commandBus
        .execute(new UpdateEntryCommand({ updateEntryDto: neweditedentry }))
        .then(async (_data) => {
          const upadednoew = await this.queryBus.execute(
            new GetSpecificEntry({ id: neweditedentry._id }),
          );
          this.logHandler.handle(
            `Entry with id = ${neweditedentry._id} edited succesfull`,
            EntryServiceMessage.Update,
          );
          return { status: true, respond: upadednoew };
        });
    } catch (e) {
      this.errorHandler.handle(e, EntryServiceMessage.Update);
      return Promise.resolve(EmptyResponse);
    }
  }

  private getHistoryEntryPromise(groupid: string): Promise<IEntry[]> {
    return this.queryBus
      .execute(new GetSpecificEntry({ groupId: groupid }))
      .then((entires) => {
        if (Array.isArray(entires) && entires.length > 0) {
          this.eventEmitter.emit(
            EventTypes.HistoryAppend,
            new HistoryAppendEvent(entires[0].userid, entires, 'entry'),
          );
        }
        return entires;
      });
  }

  private prepareDeletedEntryPromise(
    entryId: string,
  ): [Promise<IEntry>, Promise<IEntry[]>] {
    const deletedentry: Promise<IEntry> = this.queryBus.execute(
      new GetSpecificEntry({ id: entryId }),
    );
    const deletedPromise = this.commandBus.execute(
      new DeleteEntryCommand({ id: entryId }),
    );

    return [deletedentry, deletedPromise];
  }

  private deleteByGroup(groupid: string): Promise<unknown> {
    const promiseEntryHistory = this.getHistoryEntryPromise(groupid);
    const deletePromise = this.commandBus.execute(
      new DeleteEntryCommand({ groupId: groupid }),
    );
    return promiseEntryHistory
      .then(() => deletePromise)
      .then((promise) => {
        this.logHandler.handle(
          'Group deleted sucessfull',
          EntryServiceMessage.Delete,
        );
        return promise;
      })
      .catch((error) =>
        this.errorHandler.handle(error, EntryServiceMessage.Delete),
      );
  }
}
