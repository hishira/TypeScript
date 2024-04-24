import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { CreateEntryBulkCommand } from 'src/commands/entry/CreateEntryBulkCommand';
import { CreateEntryCommand } from 'src/commands/entry/CreateEntryCommand';
import { DeleteEntryCommand } from 'src/commands/entry/DeleteEntryCommand';
import { UpdateEntryCommand } from 'src/commands/entry/UpdateEntryCommand';
import { EntryServiceMessage } from 'src/errors/errors-messages/entryServiceMessages';
import { DeleteByGroupEvent } from 'src/events/deleteEntryByGroupEvent';
import { EventTypes } from 'src/events/eventTypes';
import { InsertmanyEntryEvent } from 'src/events/insertManyEntryEvent';
import { FindEntryInput } from 'src/handlers/queries/entry/entriesFindInput';
import { GetSpecificEntry } from 'src/queries/entry/getSpecificEntry.queries';
import { EmptyResponse } from 'src/response/empty.response';
import { EventAction } from 'src/schemas/Interfaces/event.interface';
import { CreateEntryDto } from 'src/schemas/dto/createentry.dto';
import { EventEntryBuilder } from 'src/schemas/utils/builders/event/entryEvent.builder';
import { Logger } from 'src/utils/Logger';
import { EntryServiceEmitterLogger } from 'src/services/eventAndLog/entryServiceEmitterLogger';
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
  private readonly logHandler: LoggerHandler = new LogHandler(this);
  private readonly errorHandler: LoggerHandler = new ErrorHandler(this);
  private readonly entryServiceEmitLogger: EntryServiceEmitterLogger =
    new EntryServiceEmitterLogger(this, this.logHandler, this.errorHandler);

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    readonly eventEmitter: EventEmitter2,
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
        this.entryServiceEmitLogger.handleEntryRestore(
          restoreBody.entryId,
          restoredEntry,
        );
        return restoredEntry;
      });
  }

  deletebyid(entryid: string): Promise<DeleteEntryResponse<IEntry>> {
    try {
      return Promise.all(this.prepareDeletedEntryPromise(entryid))
        .then((res) => {
          this.entryServiceEmitLogger.deleteActionHandler(entryid, res);
          return { status: true, response: res[0] } as any;
        })
        .catch((_err) => {
          this.entryServiceEmitLogger.errorDeleteByid();
          return EmptyResponse;
        });
    } catch (e) {
      this.entryServiceEmitLogger.errorDeleteByid();
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
        this.entryServiceEmitLogger.activateDeletedEntriesLog();
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
        .then(async (_) => {
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
        this.entryServiceEmitLogger.historyEntriesAppend(entires);
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
      .then((_) => deletePromise.then((__) => _))
      .then((fetchedEntries) => {
        this.entryServiceEmitLogger.handleDeleteEntriesByGroup(fetchedEntries);
        return fetchedEntries;
      })
      .catch((error) =>
        this.errorHandler.handle(error, EntryServiceMessage.Delete),
      );
  }
}
