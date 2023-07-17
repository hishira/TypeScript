import { Inject, Injectable } from '@nestjs/common';
import { FilterQuery } from 'mongoose';
import { GroupNotExists } from 'src/errors/GroupNotExists.error';
import { DTO } from 'src/schemas/dto/object.interface';
import { DeleteOption } from 'src/schemas/Interfaces/deleteoption.interface';
import { FilterOption } from 'src/schemas/Interfaces/filteroption.interface';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { GroupDto } from '../schemas/dto/getroup.dto';
import { CreateGroupDto } from '../schemas/dto/group.dto';
import { IGroup } from '../schemas/Interfaces/group.interface';
import { EntryService } from './entry.service';
import { EditGroupDto } from 'src/schemas/dto/editgroup.dto';
import { HistoryService } from './history.service';

@Injectable()
export class GroupService {
  constructor(
    @Inject(Repository)
    private readonly groupRepository: Repository<IGroup>,
    private readonly entityService: EntryService,
    private readonly historyService: HistoryService,
  ) {}

  create(
    groupcreateDTO: CreateGroupDto,
    userid: string,
  ): Promise<CreateGroupDto> {
    const pureDto: DTO = {
      toObject() {
        return {
          ...groupcreateDTO,
          userid: userid,
        };
      },
    };
    return this.groupRepository.create(pureDto);
  }

  async checkIfexists(groupId: string): Promise<any> {
    return this.groupRepository.findById(groupId).then((data) => {
      if (data === null || data === undefined) throw new GroupNotExists();
      return data;
    });
  }

  async getbyuser(userid: string): Promise<GroupDto[] | any> {
    const filterOption: FilterOption<FilterQuery<IGroup>> = {
      getOption() {
        return {
          userid: userid,
        };
      },
    };
    return this.groupRepository.find(filterOption);
  }

  async deleteGroup(groupId: string): Promise<unknown> {
    const deleteOption: DeleteOption<FilterQuery<IGroup>> = {
      getOption() {
        return { _id: groupId };
      },
    };
    await this.entityService.deleteByGroup(groupId);
    const groups = this.groupRepository.find(deleteOption);
    let promiseToResolve: Promise<unknown> = null;
    if (Array.isArray(groups) && groups.length > 0) {
      promiseToResolve = this.historyService.appendGroupToHistory(
        groups[0].userid,
        groups,
      );
    }
    const promise = this.groupRepository.delete(deleteOption);
    return promiseToResolve ? promiseToResolve.then((re) => promise) : promise;
  }

  async editGroup(groupId: string, groupDto: EditGroupDto): Promise<unknown> {
    return this.groupRepository.update({ _id: groupId, ...groupDto });
  }
}
