import {
  EntityType,
  EventType,
  IEvent,
} from 'src/schemas/Interfaces/event.interface';
import { IUser } from 'src/schemas/Interfaces/user.interface';
import { EditUserDto } from 'src/schemas/dto/edituser.dto';
import { CreateUserDto } from 'src/schemas/dto/user.dto';
import { EventBuilder } from './event.builder';

type UserEventType = EventType.Create | EventType.Delete | EventType.Update;

export class UserEventBuilder implements EventBuilder {
  private readonly entityType: EntityType = EntityType.User;

  constructor(
    private readonly related_entity: string,
    private readonly payloadObject: CreateUserDto | EditUserDto | IUser,
    private eventType?: UserEventType,
  ) {}

  setCreateEvent(): this {
    this.eventType = EventType.Create;
    return this;
  }

  setDeleteEvent(): this {
    this.eventType = EventType.Delete;
    return this;
  }

  setEditEvent(): this {
    this.eventType = EventType.Update;
    return this;
  }

  build(): IEvent {
    return {
      created: new Date(Date.now()),
      eventType: this.eventType,
      entityType: this.entityType,
      related_entity: this.related_entity,
      payloadObject: this.payloadObject,
    } as IEvent;
  }
}
