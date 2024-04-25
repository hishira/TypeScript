import {
  EntityType,
  EventType,
  IEvent,
} from 'src/schemas/Interfaces/event.interface';
import { IHistory } from 'src/schemas/Interfaces/history.interface';
import { EventBuilder } from './event.builder';

export class HistoryEventBuilder implements EventBuilder {
  private readonly entityType: EntityType = EntityType.History;

  constructor(
    private readonly related_entity: string,
    private readonly payloadObject: IHistory | IHistory[] | any,
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
