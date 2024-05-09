import { NotificationCommandInput } from 'src/commands/notification/NotificationCommandInput';
import {
  EntityType,
  EventType,
  IEvent,
} from 'src/schemas/Interfaces/event.interface';
import { INotification } from 'src/schemas/Interfaces/notification.interface';
import { EventBuilder } from './event.builder';
import { CreateNotificationEmailDTO } from 'src/schemas/dto/createnotification.dto';

export class NotificationEventBuilder implements EventBuilder {
  private readonly entityType: EntityType = EntityType.Notification;

  constructor(
    private readonly related_entity: string,
    private readonly payloadObject:
      | INotification
      | INotification[]
      | NotificationCommandInput
      | CreateNotificationEmailDTO,
    private eventType?: EventType,
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
    } as unknown as IEvent;
  }
}
