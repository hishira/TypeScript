import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateGroupCommand } from 'src/commands/group/CreateGroupCommand';
import { DeleteGroupCommand } from 'src/commands/group/DeleteGroupCommand';
import { UpdateGroupCommand } from 'src/commands/group/UpdateGroupCommand';
import { DeleteByGroupEvent } from 'src/events/deleteEntryByGroupEvent';
import { EventTypes } from 'src/events/eventTypes';
import { HistoryAppendEvent } from 'src/events/historyAppendEvent';
import { GetExistingGroupQuery } from 'src/queries/group/getExistingGroup.queries';
import { GetFilteredGroup } from 'src/queries/group/getFilteredGroup.queries';
import { IGroup } from 'src/schemas/Interfaces/group.interface';
import { EditGroupDto } from 'src/schemas/dto/editgroup.dto';
import { Logger } from 'src/utils/Logger';
import {
  ErrorHandler,
  LogHandler,
  LoggerContext,
} from 'src/utils/error.handlers';
import { Paginator } from 'src/utils/paginator';
import { GroupDto } from '../schemas/dto/getroup.dto';
import { CreateGroupDto } from '../schemas/dto/group.dto';
enum GroupServiceMessages {
  Create = 'Group service; create method',
  Delete = 'Group service; deleteGroup method',
  Update = 'Group service; editGroup method',
  HistoryAppendEvent = 'Create event to append group to history',
}
@Injectable()
export class GroupService implements LoggerContext {
  readonly logHandler = new LogHandler(this);
  readonly errorHandler = new ErrorHandler(this);

  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    readonly logger: Logger,
  ) {}

  create(
    groupcreateDTO: CreateGroupDto,
    userid: string,
  ): Promise<CreateGroupDto> {
    return this.commandBus
      .execute(new CreateGroupCommand(userid, groupcreateDTO))
      .then((group) => {
        this.logHandler.handle(
          `Group created, id = ${group._id}`,
          GroupServiceMessages.Create,
        );
        return group;
      });
  }

  checkIfexists(groupId: string): Promise<any> {
    return this.queryBus.execute(new GetExistingGroupQuery({ id: groupId }));
  }

  getbyuser(userid: string): Promise<GroupDto[] | any> {
    return this.queryBus.execute(new GetFilteredGroup({ userId: userid }));
  }

  deleteGroup(groupId: string): Promise<unknown> {
    this.eventEmitter.emitAsync(
      EventTypes.DeleteEntryByGroup,
      new DeleteByGroupEvent(groupId),
    );
    const promiseToResolve = this.queryBus
      .execute<GetFilteredGroup, GroupResponse<IGroup, Paginator>>(
        new GetFilteredGroup({ id: groupId }),
      )
      .then((groups) => {
        if (Array.isArray(groups) && groups.length > 0) {
          this.logHandler.handle(
            GroupServiceMessages.HistoryAppendEvent,
            GroupServiceMessages.Delete,
          );
          this.eventEmitter.emit(
            EventTypes.HistoryAppend,
            new HistoryAppendEvent(groups[0].userid, groups, 'group'),
          );
        }
        return Promise.resolve(true);
      });
    const promise = this.commandBus
      .execute<DeleteGroupCommand, unknown>(
        new DeleteGroupCommand({ id: groupId }),
      )
      .then((response) => {
        this.logHandler.handle(
          'Group deleted succesfull',
          GroupServiceMessages.Delete,
        );
        return response;
      });
    return promiseToResolve !== null
      ? promiseToResolve.then((re) => promise)
      : promise;
  }

  editGroup(groupId: string, groupDto: EditGroupDto): Promise<unknown> {
    return this.commandBus
      .execute(new UpdateGroupCommand(groupId, groupDto))
      .then((response) => {
        this.logHandler.handle(
          `Group with id = ${groupId} edidet succesfull`,
          GroupServiceMessages.Update,
        );
        return response;
      });
  }
}
