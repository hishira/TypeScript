import { ImportEntryResponse } from 'src/response/importEntries.response';
import {
  EntityType,
  EventType,
  IEvent,
} from 'src/schemas/Interfaces/event.interface';
import { ImportRequest } from 'src/schemas/Interfaces/importRequest.interface';
import { ImportRequestDto } from 'src/schemas/dto/importRequest.dto';
import { EventBuilder } from './event.builder';
type ImportRequestEventType =
  | EventType.Create
  | EventType.Update
  | EventType.Delete
  | EventType.Import
  | EventType.ActivateImport;
export class ImportRequestEventBuilder implements EventBuilder {
  private readonly entityType: EntityType = EntityType.ImportRequest;
  constructor(
    private readonly related_entity: string,
    private readonly payloadObject:
      | ImportRequest
      | ImportRequest[]
      | ImportRequestDto
      | ImportEntryResponse,
    private eventType?: ImportRequestEventType,
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

  setActivateImportRequestEvent(): this {
    this.eventType = EventType.ActivateImport;

    return this;
  }

  setImportRequestEvent(): this {
    this.eventType = EventType.Import;
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
