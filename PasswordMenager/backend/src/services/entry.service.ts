import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { FilterQuery } from 'mongoose';
import { DeleteOption } from 'src/schemas/Interfaces/deleteoption.interface';
import { FilterOption } from 'src/schemas/Interfaces/filteroption.interface';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { CreateEntryDto } from 'src/schemas/dto/createentry.dto';
import { DTO } from 'src/schemas/dto/object.interface';
import { DeleteEntryResponse, EditEntryResponse } from 'src/types/common/main';
import { PaginatorDto } from 'src/utils/paginator';
import {
  EntryData,
  EntryDtoMapper,
  IEntry,
  OptionModelBuilder,
} from '../schemas/Interfaces/entry.interface';
import { EditEntryDto } from './../schemas/dto/editentry.dto';

const EmptyResponse = {
  status: false,
  respond: null,
};
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

  private getObjectToCreate(
    entrycreateDTO: CreateEntryDto,
    userid: string,
  ): DTO {
    const entryToAdd = entrycreateDTO;
    const isGroupIdEmpty = entryToAdd.groupid === '';
    let restParams: Partial<CreateEntryDto> = entrycreateDTO;
    if (isGroupIdEmpty) {
      const { groupid, ...restEntryParams } = entryToAdd;
      restParams = restEntryParams;
    }

    return new (class implements DTO {
      toObject() {
        return {
          ...(isGroupIdEmpty && restParams ? restParams : entrycreateDTO),
          userid: userid,
        };
      }
    })();
  }
  create(
    entrycreateDTO: CreateEntryDto,
    userid: string,
  ): Promise<IEntry | { message: string }> {
    return this.entryRepository
      .create(this.getObjectToCreate(entrycreateDTO, userid))
      .then((response: Test): any => this.emitNotificationCreate(response))
      .catch((_) => {
        console.error(_);
        return { message: 'Error whice creating entry' };
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
    const option: FilterOption<FilterQuery<IEntry>> = {
      getOption() {
        return { groupid: groupid !== '' ? groupid : null };
      },
    };

    return this.entryRepository.find(option);
  }

  getUserEntriesWithoutGroup(
    userid: string,
    paginator?: PaginatorDto,
  ): Promise<IEntry[] | EntryData> {
    //const option: FilterOption<FilterQuery<IEntry>> = {
    //  getOption() {
    //    return { groupid: null, userid: userid };
    //  },
    //};

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
      //const deleteOption: DeleteOption<FilterQuery<IEntry>> = {
      //  getOption() {
      //    return { _id: entryid };
      //  },
      //};
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
    //const filterOption: FilterOption<FilterQuery<IEntry>> = {
    //  getOption() {
    //    return {
    //      userid: userId,
    //    };
    //  },
    //};
    return this.entryRepository.find(
      new OptionModelBuilder().updateUserIdOPtion(userId).getOption(),
    );
  }

  editentry(neweditedentry: EditEntryDto): Promise<EditEntryResponse> {
    try {
      const entry: Partial<IEntry> = this.getPartialUpdateEntry(neweditedentry);
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

  private getPartialUpdateEntry(editEntryDTO: EditEntryDto): Partial<IEntry> {
    return {
      _id: editEntryDTO._id,
      ...(editEntryDTO.title !== '' ? { title: editEntryDTO.title } : {}),
      ...(editEntryDTO.password !== ''
        ? { password: editEntryDTO.password }
        : {}),
      ...(editEntryDTO.note !== '' ? { note: editEntryDTO.note } : {}),
      ...(editEntryDTO.username !== ''
        ? { username: editEntryDTO.username }
        : {}),
      ...(editEntryDTO.url !== '' ? { url: editEntryDTO.url } : {}),
      ...(editEntryDTO.passwordExpiredDate !== ''
        ? { passwordExpiredDate: editEntryDTO.passwordExpiredDate }
        : {}),
    };
  }
}
