import { Inject, Injectable } from '@nestjs/common';
import { FilterQuery } from 'mongoose';
import { CreateEntryDto } from 'src/schemas/dto/createentry.dto';
import { DTO } from 'src/schemas/dto/object.interface';
import { DeleteOption } from 'src/schemas/Interfaces/deleteoption.interface';
import { FilterOption } from 'src/schemas/Interfaces/filteroption.interface';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { DeleteEntryResponse, EditEntryResponse } from 'src/types/common/main';
import { IEntry } from '../schemas/Interfaces/entry.interface';
import { EditEntryDto } from './../schemas/dto/editentry.dto';
@Injectable()
export class EntryService {
  constructor(
    @Inject(Repository)
    private readonly entryRepository: Repository<IEntry>,
  ) {}

  create(
    entrycreateDTO: CreateEntryDto,
    userid: string,
  ): Promise<IEntry | { message: string }> {
    const pureDto: DTO = {
      toObject() {
        return {
          ...entrycreateDTO,
          userid: userid,
        };
      },
    };
    return this.entryRepository.create(pureDto).catch((_) => {
      console.error(_);
      return { message: 'Error whice creating entry' };
    });
  }

  async getById(entryId: string): Promise<IEntry> {
    return this.entryRepository.findById(entryId);
  }

  async getbygroupid(groupid: string): Promise<IEntry[]> {
    const option: FilterOption<FilterQuery<IEntry>> = {
      getOption() {
        return { groupid: groupid };
      },
    };

    return this.entryRepository.find(option);
  }

  async deletebyid(entryid: string): Promise<DeleteEntryResponse> {
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
          return { status: true, respond: res[0] };
        })
        .catch((_err) => {
          return {
            status: false,
            respond: null,
          };
        });
    } catch (e) {
      return { status: false, respond: null };
    }
  }

  async deleteByGroup(groupid: string): Promise<unknown> {
    return await this.entryRepository.delete({
      getOption() {
        return {
          groupid: groupid,
        };
      },
    });
  }

  async getByUser(userId: string): Promise<IEntry[]> {
    const filterOption: FilterOption<FilterQuery<IEntry>> = {
      getOption() {
        return {
          userid: userId,
        };
      },
    };
    return this.entryRepository.find(filterOption);
  }

  async editentry(neweditedentry: EditEntryDto): Promise<EditEntryResponse> {
    try {
      const entry: Partial<IEntry> = this.getPartialUpdateEntry(neweditedentry);
      return this.entryRepository.update(entry).then(async (_data) => {
        const upadednoew = await this.entryRepository.findById(
          neweditedentry._id,
        );

        return { status: true, respond: upadednoew };
      });
    } catch (e) {
      return { status: false, respond: null };
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
    };
  }
}
