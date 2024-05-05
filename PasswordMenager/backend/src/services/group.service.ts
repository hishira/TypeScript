import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateGroupCommand } from 'src/commands/group/CreateGroupCommand';
import { DeleteGroupCommand } from 'src/commands/group/DeleteGroupCommand';
import { UpdateGroupCommand } from 'src/commands/group/UpdateGroupCommand';
import { GetExistingGroupQuery } from 'src/queries/group/getExistingGroup.queries';
import { GetFilteredGroup } from 'src/queries/group/getFilteredGroup.queries';
import { IGroup } from 'src/schemas/Interfaces/group.interface';
import { EditGroupDto } from 'src/schemas/dto/editgroup.dto';
import { Logger } from 'src/utils/Logger';
import { LogHandler, LoggerContext } from 'src/utils/error.handlers';
import { Paginator } from 'src/utils/paginator';
import { GroupDto } from '../schemas/dto/getroup.dto';
import { CreateGroupDto } from '../schemas/dto/group.dto';
import { GroupServiceEmitterLogger } from './eventAndLog/groupServiceEmitterLogger';
@Injectable()
export class GroupService implements LoggerContext {
  readonly groupEventLogHandler: GroupServiceEmitterLogger;
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    readonly logger: Logger,
  ) {
    this.groupEventLogHandler = new GroupServiceEmitterLogger(
      new LogHandler(this),
      this.eventEmitter,
    );
  }

  create(
    groupcreateDTO: CreateGroupDto,
    userid: string,
  ): Promise<CreateGroupDto> {
    return this.commandBus
      .execute(new CreateGroupCommand(userid, groupcreateDTO))
      .then((group) => {
        this.groupEventLogHandler.createEventAndLog(group);
        return group;
      });
  }

  checkIfexists(groupId: string): Promise<any> {
    return this.queryBus.execute(new GetExistingGroupQuery({ id: groupId }));
  }

  getbyuser(userid: string): Promise<GroupDto[] | any> {
    return this.queryBus.execute(new GetFilteredGroup({ userId: userid }));
  }

  deleteGroup(groupId: string): Promise<IGroup | boolean> {
    this.groupEventLogHandler.emitDeleteGroupEvent(groupId);
    const promiseToResolve = this.prepareEntryToDeleteAndHistorySave(groupId);
    const promise = this.prepareDeleteGroupPromise(groupId);
    return promiseToResolve !== null
      ? promiseToResolve.then((_) => promise)
      : promise;
  }

  editGroup(groupId: string, groupDto: EditGroupDto): Promise<IGroup> {
    return this.commandBus
      .execute(new UpdateGroupCommand(groupId, groupDto))
      .then((response: IGroup) => {
        this.groupEventLogHandler.editEventAndLog(groupId, groupDto);
        return response;
      });
  }

  private prepareEntryToDeleteAndHistorySave(
    groupId: string,
  ): Promise<boolean> {
    return this.queryBus
      .execute<GetFilteredGroup, GroupResponse<IGroup, Paginator>>(
        new GetFilteredGroup({ id: groupId }),
      )
      .then((groups) => {
        this.groupEventLogHandler.logAndEmitHistoryAppendEvent(groups);
        return Promise.resolve(true);
      });
  }

  private prepareDeleteGroupPromise(groupId: string): Promise<IGroup> {
    return this.commandBus
      .execute<DeleteGroupCommand, unknown>(
        new DeleteGroupCommand({ id: groupId }),
      )
      .then((response: IGroup) => {
        this.groupEventLogHandler.deleteEventAndLog(response);
        return response;
      });
  }
}
