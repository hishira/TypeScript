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

@Injectable()
export class GroupService {
  constructor(
    @Inject(Repository)
    private readonly groupRepository: Repository<IGroup>,
    private readonly entityService: EntryService,
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

  async getbyuser(userid: string): Promise<GroupDto[]> {
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
    return await this.groupRepository.delete(deleteOption);
  }
}
