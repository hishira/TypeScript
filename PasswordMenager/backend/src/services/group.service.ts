import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { EditGroupDto } from 'src/schemas/dto/editgroup.dto';
import {
  GroupDtoMapper,
  GroupOptionBuilder,
  GroupUtils,
  IGroup,
} from '../schemas/Interfaces/group.interface';
import { GroupDto } from '../schemas/dto/getroup.dto';
import { CreateGroupDto } from '../schemas/dto/group.dto';
import { EntryService } from './entry.service';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateGroupCommand } from 'src/commands/group/CreateGroupCommand';
import { GetExistingGroupQuery } from 'src/queries/group/getExistingGroup.queries';
import { GetFilteredGroup } from 'src/queries/group/getFilteredGroup.queries';

@Injectable()
export class GroupService {
  constructor(
    @Inject(Repository)
    private readonly groupRepository: Repository<IGroup>,
    private readonly entityService: EntryService,
    private readonly eventEmitter: EventEmitter2,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  create(
    groupcreateDTO: CreateGroupDto,
    userid: string,
  ): Promise<CreateGroupDto> {
    return this.commandBus.execute(
      new CreateGroupCommand(userid, groupcreateDTO),
    );
  }

  async checkIfexists(groupId: string): Promise<any> {
    return this.queryBus.execute(new GetExistingGroupQuery(groupId));
  }

  async getbyuser(userid: string): Promise<GroupDto[] | any> {
    //TODO: check if work
    return this.queryBus.execute(new GetFilteredGroup(null, userid));
    //return this.groupRepository.find(
    //  new GroupOptionBuilder().updateUserId(userid).getOption(),
    //);
  }

  async deleteGroup(groupId: string): Promise<unknown> {
    //TODO Check if works
    const deleteOptions = new GroupOptionBuilder()
      .updateId(groupId)
      .getOption();
    await this.entityService.deleteByGroup(groupId);
    const promiseToResolve = this.groupRepository
      .find(deleteOptions)
      .then((groups) => {
        // Like in entry service
        if (Array.isArray(groups) && groups.length > 0) {
          this.eventEmitter.emit('history.append', {
            userid: groups[0].userid,
            entries: groups,
            historyAddType: 'group',
          });
        }
        return Promise.resolve(true);
      });
    const promise = this.groupRepository.delete(deleteOptions);
    return promiseToResolve ? promiseToResolve.then((re) => promise) : promise;
  }

  async editGroup(groupId: string, groupDto: EditGroupDto): Promise<unknown> {
    return this.groupRepository.update({ _id: groupId, ...groupDto });
  }
}
