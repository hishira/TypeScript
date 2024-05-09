import { UpdateHistoryCommand } from 'src/commands/history/UpdateHistoryCommand';
import {
  EntityType,
  EventType,
  IEvent,
} from 'src/schemas/Interfaces/event.interface';
import { IHistory } from 'src/schemas/Interfaces/history.interface';
import { EventBuilder } from './event.builder';

type HistoryEventType =
  | EventType.Create
  | EventType.Delete
  | EventType.Update
  | EventType.EntityHistoryAppend
  | EventType.GroupHistoryAppend;
export class HistoryEventBuilder implements EventBuilder {
  private readonly entityType: EntityType = EntityType.History;

  constructor(
    private readonly related_entity: string,
    private readonly payloadObject:
      | IHistory
      | IHistory[]
      | UpdateHistoryCommand,
    private eventType?: HistoryEventType,
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

  setEntityHistoryAppendEvent(): this {
    this.eventType = EventType.EntityHistoryAppend;

    return this;
  }

  setGroupHistoryAppendEvent(): this {
    this.eventType = EventType.GroupHistoryAppend;

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
