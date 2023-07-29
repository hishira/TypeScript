import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { FilterQuery } from 'mongoose';
import { GroupNotExists } from 'src/errors/GroupNotExists.error';
import { DeleteOption } from 'src/schemas/Interfaces/deleteoption.interface';
import { FilterOption } from 'src/schemas/Interfaces/filteroption.interface';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { EditGroupDto } from 'src/schemas/dto/editgroup.dto';
import { DTO } from 'src/schemas/dto/object.interface';
import { IGroup } from '../schemas/Interfaces/group.interface';
import { GroupDto } from '../schemas/dto/getroup.dto';
import { CreateGroupDto } from '../schemas/dto/group.dto';
import { EntryService } from './entry.service';

@Injectable()
export class GroupService {
  constructor(
    @Inject(Repository)
    private readonly groupRepository: Repository<IGroup>,
    private readonly entityService: EntryService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  private getCreatePureDto(
    userid: string,
    groupcreateDTO: CreateGroupDto,
  ): DTO {
    return new (class implements DTO {
      toObject() {
        return {
          ...groupcreateDTO,
          userid: userid,
        };
      }
    })();
  }
  create(
    groupcreateDTO: CreateGroupDto,
    userid: string,
  ): Promise<CreateGroupDto> {
    return this.groupRepository.create(
      this.getCreatePureDto(userid, groupcreateDTO),
    );
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
    const promiseToResolve = this.groupRepository
      .find(deleteOption)
      .then((groups) => {
        if (Array.isArray(groups) && groups.length > 0) {
          this.eventEmitter.emit('history.append', {
            userid: groups[0].userid,
            entries: groups,
          });
        }
        return Promise.resolve(true);
      });
    const promise = this.groupRepository.delete(deleteOption);
    return promiseToResolve ? promiseToResolve.then((re) => promise) : promise;
  }

  async editGroup(groupId: string, groupDto: EditGroupDto): Promise<unknown> {
    return this.groupRepository.update({ _id: groupId, ...groupDto });
  }
}
