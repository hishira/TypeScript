import {
  EntityType,
  EventType,
  IEvent,
} from 'src/schemas/Interfaces/event.interface';
import { IGroup } from 'src/schemas/Interfaces/group.interface';
import { EditGroupDto } from 'src/schemas/dto/editgroup.dto';
import { CreateGroupDto } from 'src/schemas/dto/group.dto';
import { EventBuilder } from './event.builder';

type GroupEventType = EventType.Create | EventType.Delete | EventType.Update;

export class GroupEventBuilder implements EventBuilder {
  private readonly entityType: EntityType = EntityType.Group;
  constructor(
    private readonly related_entity: string,
    private readonly payloadObject: CreateGroupDto | EditGroupDto | IGroup,
    private eventType?: GroupEventType,
  ) {}

  build(): IEvent {
    return {
      created: new Date(Date.now()),
      eventType: this.eventType,
      entityType: this.entityType,
      related_entity: this.related_entity,
      payloadObject: this.payloadObject as unknown as Record<string, unknown>,
    } as IEvent;
  }
}
