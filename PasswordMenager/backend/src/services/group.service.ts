import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateGroupCommand } from 'src/commands/group/CreateGroupCommand';
import { DeleteGroupCommand } from 'src/commands/group/DeleteGroupCommand';
import { UpdateGroupCommand } from 'src/commands/group/UpdateGroupCommand';
import { DeleteByGroupEvent } from 'src/events/deleteEntryByGroupEvent';
import { EventTypes } from 'src/events/eventTypes';
import { HistoryAppendEvent } from 'src/events/historyAppendEvent';
import { GroupResponse } from 'src/handlers/queries/group/getFilteredGroup.queries';
import { GetExistingGroupQuery } from 'src/queries/group/getExistingGroup.queries';
import { GetFilteredGroup } from 'src/queries/group/getFilteredGroup.queries';
import { EditGroupDto } from 'src/schemas/dto/editgroup.dto';
import { GroupDto } from '../schemas/dto/getroup.dto';
import { CreateGroupDto } from '../schemas/dto/group.dto';

@Injectable()
export class GroupService {
  constructor(
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
    return this.queryBus.execute(new GetExistingGroupQuery({ id: groupId }));
  }

  async getbyuser(userid: string): Promise<GroupDto[] | any> {
    return this.queryBus.execute(new GetFilteredGroup({ userId: userid }));
  }

  async deleteGroup(groupId: string): Promise<unknown> {
    await this.eventEmitter.emitAsync(
      EventTypes.DeleteEntryByGroup,
      new DeleteByGroupEvent(groupId),
    );
    const promiseToResolve = this.queryBus
      .execute<GetFilteredGroup, GroupResponse>(
        new GetFilteredGroup({ id: groupId }),
      )
      .then((groups) => {
        if (Array.isArray(groups) && groups.length > 0) {
          this.eventEmitter.emit(
            EventTypes.HistoryAppend,
            new HistoryAppendEvent(groups[0].userid, groups, 'group'),
          );
        }
        return Promise.resolve(true);
      });
    const promise = this.commandBus.execute<DeleteGroupCommand, unknown>(
      new DeleteGroupCommand({ id: groupId }),
    );
    return promiseToResolve !== null
      ? promiseToResolve.then((re) => promise)
      : promise;
  }

  async editGroup(groupId: string, groupDto: EditGroupDto): Promise<unknown> {
    return this.commandBus.execute(new UpdateGroupCommand(groupId, groupDto));
  }
}
