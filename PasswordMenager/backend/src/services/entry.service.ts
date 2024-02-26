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
import { CreateEntryDto } from 'src/schemas/dto/createentry.dto';
import { DeleteEntryResponse, EditEntryResponse } from 'src/types/common/main';
import {
  EntryData,
  EntryState,
  IEntry,
} from '../schemas/Interfaces/entry.interface';
import { EditEntryDto } from './../schemas/dto/editentry.dto';

//TODO: Temporary fix, for event catcher
@Injectable()
export class EntryEmitService {
  constructor(private readonly commandBus: CommandBus) {}

  @OnEvent(EventTypes.InsertManyEntry, { async: true })
  insertMany(payload: InsertmanyEntryEvent) {
    return this.commandBus.execute(new CreateEntryBulkCommand(payload.dtos));
  }
}
@Injectable()
export class EntryService {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  create(
    entrycreateDTO: CreateEntryDto,
    userid: string,
  ): Promise<IEntry | { message: string }> {
    return this.commandBus.execute(
      new CreateEntryCommand(userid, entrycreateDTO),
    );
  }

  @OnEvent(EventTypes.DeleteEntryByGroup, { async: true })
  deleteByGroupEvent(payload: DeleteByGroupEvent) {
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

  restoreEntry(restoreBody: { entryId: string }) {
    return this.commandBus.execute(
      new UpdateEntryCommand({
        id: restoreBody.entryId,
        entryState: EntryState.ACTIVE,
      }),
    );
  }

  deletebyid(entryid: string): Promise<DeleteEntryResponse> {
    try {
      const deletedentry: Promise<IEntry> = this.queryBus.execute(
        new GetSpecificEntry({ id: entryid }),
      );
      const deletedPromise = this.commandBus.execute(
        new DeleteEntryCommand({ id: entryid }),
      );
      return Promise.all([deletedentry, deletedPromise])
        .then((res) => {
          this.eventEmitter.emit(
            EventTypes.HistoryAppend,
            new HistoryAppendEvent(res[0].userid, [res[0]], 'entry'),
          );
          return { status: true, response: res[0] } as any;
        })
        .catch((_err) => {
          console.error(_err);
          return EmptyResponse;
        });
    } catch (e) {
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

  activateDeletedEntreis(entryId: string) {
    return this.commandBus.execute(
      new UpdateEntryCommand({
        id: entryId,
        entryState: EntryState.ACTIVE,
      }),
    );
  }

  deleteByGroup(groupid: string): Promise<unknown> {
    const promiseEntryHistory = this.getHistoryEntryPromise(groupid);
    const deletePromise = this.commandBus.execute(
      new DeleteEntryCommand({ groupId: groupid }),
    );
    return promiseEntryHistory.then(() => deletePromise);
  }

  getByUser(userId: string, limit?: number): Promise<IEntry[] | EntryData> {
    return this.queryBus.execute(
      new GetSpecificEntry({ userId: userId, limit: limit }),
    );
  }

  editentry(neweditedentry: EditEntryDto): Promise<EditEntryResponse> {
    try {
      return this.commandBus
        .execute(new UpdateEntryCommand({ updateEntryDto: neweditedentry }))
        .then(async (_data) => {
          const upadednoew = await this.queryBus.execute(
            new GetSpecificEntry({ id: neweditedentry._id }),
          );

          return { status: true, respond: upadednoew };
        });
    } catch (e) {
      return Promise.resolve(EmptyResponse);
    }
  }

  private getHistoryEntryPromise(groupid: string) {
    return this.queryBus
      .execute(new GetSpecificEntry({ groupId: groupid }))
      .then((entires) => {
        if (Array.isArray(entires) && entires.length > 0) {
          this.eventEmitter.emit(
            EventTypes.HistoryAppend,
            new HistoryAppendEvent(entires[0].userid, entires, 'entry'),
          );
        }
      });
  }
}
