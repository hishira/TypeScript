import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
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

const EmptyResponse = {
  status: false,
  respond: null,
};
const CreateEntryErrorMessage = { message: 'Error whice creating entry' };
type Test =
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
  ) {}
  create(
    entrycreateDTO: CreateEntryDto,
    userid: string,
  ): Promise<IEntry | { message: string }> {
    return this.entryRepository
      .create(EntryDtoMapper.CreateEntryDtoToDto(entrycreateDTO, userid))
      .then((response: Test): any => this.emitNotificationCreate(response))
      .catch((_) => {
        console.error(_);
        return CreateEntryErrorMessage;
      });
  }

  @OnEvent('entry.insertMany', { async: true })
  insertMany(payload: { objects: DTO[] }) {
    const mappedDto: DTO[] = payload.objects.map(
      EntryDtoMapper.encryptDtoPassword,
    );
    return this.entryRepository.createMany(mappedDto);
  }
  private emitNotificationCreate(response: Test): any {
    if ('message' in response) return response;
    const passwordExpireDate = response.passwordExpiredDate;
    if (passwordExpireDate === null || passwordExpireDate === undefined)
      return response;
    //TODO refactor, move to notification
    console.log('Response', response);
    this.eventEmitter.emit('notification.create', {
      passwordExpireDate: passwordExpireDate,
      entry: response,
      userid: response.userid,
    });

    return response;
  }

  getById(entryId: string): Promise<IEntry> {
    return this.entryRepository.findById(entryId);
  }

  getbygroupid(groupid: string): Promise<IEntry[] | EntryData> {
    return this.entryRepository.find(
      new OptionModelBuilder().updateGroupIdOrNull(groupid).getOption(),
    );
  }

  getUserEntriesWithoutGroup(
    userid: string,
    paginator?: PaginatorDto,
  ): Promise<IEntry[] | EntryData> {
    return this.entryRepository.find(
      new OptionModelBuilder()
        .updateUserIdOPtion(userid)
        .setGroupIdNull()
        .getOption(),
      paginator,
    );
  }

  deletebyid(entryid: string): Promise<DeleteEntryResponse> {
    // TODO: Refactor
    try {
      const deletedentry: Promise<IEntry> =
        this.entryRepository.findById(entryid);
      const deletedPromise = this.entryRepository.delete(
        new OptionModelBuilder().updateEntryId(entryid).getOption(),
      );
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
    return this.entryRepository.find(
      new OptionModelBuilder()
        .updateUserIdOPtion(userid)
        .updateStateEntry(EntryState.DELETED)
        .updateLimit(10)
        .getOption(),
    );
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
