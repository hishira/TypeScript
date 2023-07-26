import { Inject, Injectable } from '@nestjs/common';
import { FilterQuery } from 'mongoose';
import { DeleteOption } from 'src/schemas/Interfaces/deleteoption.interface';
import { FilterOption } from 'src/schemas/Interfaces/filteroption.interface';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { CreateEntryDto } from 'src/schemas/dto/createentry.dto';
import { DTO } from 'src/schemas/dto/object.interface';
import { DeleteEntryResponse, EditEntryResponse } from 'src/types/common/main';
import { PaginatorDto } from 'src/utils/paginator';
import { EntryData, IEntry } from '../schemas/Interfaces/entry.interface';
import { EditEntryDto } from './../schemas/dto/editentry.dto';
import { HistoryService } from './history.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

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
    private readonly historyService: HistoryService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  create(
    entrycreateDTO: CreateEntryDto,
    userid: string,
  ): Promise<IEntry | { message: string }> {
    const entryToAdd = entrycreateDTO;
    const isGroupIdEmpty = entryToAdd.groupid === '';
    let restParams: Partial<CreateEntryDto> = entrycreateDTO;
    if (isGroupIdEmpty) {
      const { groupid, ...restEntryParams } = entryToAdd;
      restParams = restEntryParams;
    }
    const pureDto: DTO = {
      toObject() {
        return {
          ...(isGroupIdEmpty && restParams ? restParams : entrycreateDTO),
          userid: userid,
        };
      },
    };
    return this.entryRepository
      .create(pureDto)
      .then((response: Test): any => {
        if ('message' in response) return response;
        const passwordExpireDate = response.passwordExpiredDate;
        if (passwordExpireDate) {
          this.eventEmitter.emit('notification.create', {
            passwordExpireDate: passwordExpireDate,
            entry: response,
          });
        }
        return response;
      })
      .catch((_) => {
        console.error(_);
        return { message: 'Error whice creating entry' };
      });
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
    const option: FilterOption<FilterQuery<IEntry>> = {
      getOption() {
        return { groupid: null, userid: userid };
      },
    };

    return this.entryRepository.find(option, paginator);
  }

  deletebyid(entryid: string): Promise<DeleteEntryResponse> {
    // TODO: Refactor
    try {
      const deletedentry: Promise<IEntry> =
        this.entryRepository.findById(entryid);
      const deleteOption: DeleteOption<FilterQuery<IEntry>> = {
        getOption() {
          return { _id: entryid };
        },
      };
      const deletedPromise = this.entryRepository.delete(deleteOption);
      return Promise.all([deletedentry, deletedPromise])
        .then((res) => {
          return this.historyService
            .appendEntityToHistory(res[0].userid as unknown as string, [res[0]])
            .then((r) => ({ status: true, respond: res[0] }));
        })
        .catch((_err) => {
          return {
            status: false,
            respond: null,
          };
        });
    } catch (e) {
      return Promise.resolve({ status: false, respond: null });
    }
  }

  private getHistoryEntryPromise(groupid: string) {
    return this.entryRepository
      .find({
        getOption() {
          return {
            groupid: groupid,
          };
        },
      })
      .then((entires) => {
        if (Array.isArray(entires) && entires.length > 0) {
          return this.historyService.appendEntityToHistory(
            entires[0].userid as unknown as string,
            entires,
          );
        }
      });
  }

  deleteByGroup(groupid: string): Promise<unknown> {
    const promiseEntryHistory = this.getHistoryEntryPromise(groupid);
    const deletePromise = this.entryRepository.delete({
      getOption() {
        return {
          groupid: groupid,
        };
      },
    });
    return promiseEntryHistory.then(() => deletePromise);
  }

  getByUser(userId: string): Promise<IEntry[] | EntryData> {
    const filterOption: FilterOption<FilterQuery<IEntry>> = {
      getOption() {
        return {
          userid: userId,
        };
      },
    };
    return this.entryRepository.find(filterOption);
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
      return Promise.resolve({ status: false, respond: null });
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
