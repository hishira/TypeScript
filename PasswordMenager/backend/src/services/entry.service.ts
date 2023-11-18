import { Inject, Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { CreateEntryBulkCommand } from 'src/commands/entry/CreateEntryBulkCommand';
import { CreateEntryCommand } from 'src/commands/entry/CreateEntryCommand';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { CreateEntryDto } from 'src/schemas/dto/createentry.dto';
import { DTO } from 'src/schemas/dto/object.interface';
import { DeleteEntryResponse, EditEntryResponse } from 'src/types/common/main';
import { PaginatorDto } from 'src/utils/paginator';
import {
  EntryData,
  EntryDtoMapper,
  EntryState,
  IEntry,
  OptionModelBuilder,
} from '../schemas/Interfaces/entry.interface';
import { EditEntryDto } from './../schemas/dto/editentry.dto';
import { GetSpecificEntry } from 'src/queries/entry/getSpecificEntry.queries';
import { DeleteEntryCommand } from 'src/commands/entry/DeleteEntryCommand';
import { UpdateEntryCommand } from 'src/commands/entry/UpdateEntryCommand';

const EmptyResponse = {
  status: false,
  respond: null,
};
export const CreateEntryErrorMessage = {
  message: 'Error whice creating entry',
};
export type Test =
  | IEntry
  | {
      message: string;
    };
@Injectable()
export class EntryService {
  constructor(
    @Inject(Repository)
    private readonly entryRepository: Repository<IEntry>,
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

  @OnEvent('entry.insertMany', { async: true })
  insertMany(payload: { objects: DTO[] }) {
    return this.commandBus.execute(new CreateEntryBulkCommand(payload.objects));
  }

  getById(entryId: string): Promise<IEntry> {
    //return this.entryRepository.findById(entryId);
    return this.queryBus.execute(new GetSpecificEntry({ id: entryId }));
  }

  getbygroupid(groupid: string): Promise<IEntry[] | EntryData> {
    //return this.entryRepository.find(
    //  new OptionModelBuilder().updateGroupIdOrNull(groupid).getOption(),
    //);
    return this.queryBus.execute(new GetSpecificEntry({ groupId: groupid }));
  }

  getUserEntriesWithoutGroup(
    userid: string,
    paginator?: PaginatorDto,
  ): Promise<IEntry[] | EntryData> {
    return this.queryBus.execute(
      new GetSpecificEntry({ userId: userid, paginator: paginator }),
    );
    //return this.entryRepository.find(
    //  new OptionModelBuilder()
    //    .updateUserIdOPtion(userid)
    //    .setGroupIdNull()
    //    .getOption(),
    //  paginator,
    //);
  }

  deletebyid(entryid: string): Promise<DeleteEntryResponse> {
    // TODO: Refactor
    try {
      const deletedentry: Promise<IEntry> = this.queryBus.execute(
        new GetSpecificEntry({ id: entryid }),
      );
      //this.entryRepository.findById(entryid);
      const deletedPromise = this.commandBus.execute(
        new DeleteEntryCommand({ id: entryid }),
      ); // this.entryRepository.delete(
      //  new OptionModelBuilder().updateEntryId(entryid).getOption(),
      //);
      return Promise.all([deletedentry, deletedPromise])
        .then((res) => {
          this.eventEmitter.emit('history.append', {
            userid: res[0].userid,
            entries: [res[0]],
            historyAddType: 'entry',
          });
          return { status: true, response: res[0] } as any;
        })
        .catch((_err) => {
          return EmptyResponse;
        });
    } catch (e) {
      return Promise.resolve(EmptyResponse);
    }
  }

  getLastDeletedUserEntries(userid: string): Promise<IEntry[] | EntryData> {
    //return this.entryRepository.find(
    //  new OptionModelBuilder()
    //    .updateUserIdOPtion(userid)
    //    .updateStateEntry(EntryState.DELETED)
    //    .updateLimit(10)
    //    .getOption(),
    //);
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
    //return this.entryRepository.update({
    //  _id: entryId,
    //  state: EntryState.ACTIVE,
    //});
  }
  private getHistoryEntryPromise(groupid: string) {
    return this.entryRepository
      .find(new OptionModelBuilder().updateGroupId(groupid).getOption())
      .then((entires) => {
        if (Array.isArray(entires) && entires.length > 0) {
          this.eventEmitter.emit('history.append', {
            userid: entires[0].userid as unknown as string,
            entries: entires,
            historyAddType: 'entry',
          });
        }
      });
  }

  deleteByGroup(groupid: string): Promise<unknown> {
    const promiseEntryHistory = this.getHistoryEntryPromise(groupid);
    const deletePromise = this.entryRepository.delete(
      new OptionModelBuilder().updateGroupId(groupid).getOption(),
    );
    return promiseEntryHistory.then(() => deletePromise);
  }

  getByUser(userId: string): Promise<IEntry[] | EntryData> {
    return this.entryRepository.find(
      new OptionModelBuilder().updateUserIdOPtion(userId).getOption(),
    );
  }

  editentry(neweditedentry: EditEntryDto): Promise<EditEntryResponse> {
    try {
      const entry: Partial<IEntry> =
        EntryDtoMapper.GetPartialUpdateEntry(neweditedentry);
      return this.entryRepository.update(entry).then(async (_data) => {
        const upadednoew = await this.entryRepository.findById(
          neweditedentry._id,
        );

        return { status: true, respond: upadednoew };
      });
    } catch (e) {
      return Promise.resolve(EmptyResponse);
    }
  }
}
