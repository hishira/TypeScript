import { EventEmitter2 } from '@nestjs/event-emitter';
import { DeleteByGroupEvent } from 'src/events/deleteEntryByGroupEvent';
import { EventTypes } from 'src/events/eventTypes';
import { HistoryAppendEvent } from 'src/events/historyAppendEvent';
import { EventAction } from 'src/schemas/Interfaces/event.interface';
import { IGroup } from 'src/schemas/Interfaces/group.interface';
import { GroupEventBuilder } from 'src/schemas/utils/builders/event/groupEvent.builder';
import { LoggerHandler } from 'src/utils/error.handlers';
import { Paginator } from 'src/utils/paginator';
import { GroupServiceMessages } from 'src/errors/errors-messages/groupErrorMessages';
import { EditGroupDto } from 'src/schemas/dto/editgroup.dto';

export class GroupServiceEmitterLogger {
  constructor(
    private readonly logHandler: LoggerHandler,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  createEventAndLog(group: IGroup): void {
    this.logHandler.handle(
      `Group created, id = ${group._id}`,
      GroupServiceMessages.Create,
    );
    this.eventEmitter.emitAsync(
      EventAction.Create,
      new GroupEventBuilder(group._id, group).setCreateEvent().build(),
    );
  }

  emitDeleteGroupEvent(groupId: string): void {
    this.eventEmitter.emitAsync(
      EventTypes.DeleteEntryByGroup,
      new DeleteByGroupEvent(groupId),
    );
  }

  logAndEmitHistoryAppendEvent(groups: GroupResponse<IGroup, Paginator>): void {
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
  }

  deleteEventAndLog(group: unknown): void {
    this.logHandler.handle(
      'Group deleted succesfull',
      GroupServiceMessages.Delete,
    );
    this.eventEmitter.emitAsync(
      EventAction.Create,
      new GroupEventBuilder((group as IGroup)?._id ?? '', group as IGroup)
        .setDeleteEvent()
        .build(),
    );
  }

  editEventAndLog(groupId: string, group: EditGroupDto): void {
    this.logHandler.handle(
      `Group with id = ${groupId} edited succesfull`,
      GroupServiceMessages.Update,
    );
    this.eventEmitter.emitAsync(
      EventAction.Create,
      new GroupEventBuilder(groupId, group).setEditEvent().build(),
    );
  }
}
