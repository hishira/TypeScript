import { EventType } from 'src/schemas/Interfaces/event.interface';

export interface CreateEventCommandInput {
  readonly eventType: EventType;
  readonly created?: Date;
  readonly relatedEnittyId: string;
}
