import { IEntry } from 'src/schemas/Interfaces/entry.interface';
import {
  EntityType,
  EventType,
  IEvent,
} from 'src/schemas/Interfaces/event.interface';
import { CreateEntryDto } from 'src/schemas/dto/createentry.dto';
import { EditEntryDto } from 'src/schemas/dto/editentry.dto';
import { EventBuilder } from './event.builder';

type EntityEventType =
  | EventType.Create
  | EventType.Delete
  | EventType.Update
  | EventType.Restore;

export class EventEntryBuilder implements EventBuilder {
  private readonly entityType: EntityType = EntityType.Entry;

  constructor(
    private readonly related_entity: string,
    private readonly payloadObject: CreateEntryDto | EditEntryDto | IEntry,
    private eventType?: EntityEventType,
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

  setRestoreEvent(): this {
    this.eventType = EventType.Restore;
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
