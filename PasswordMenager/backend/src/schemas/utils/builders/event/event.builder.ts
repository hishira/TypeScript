import { IEvent } from 'src/schemas/Interfaces/event.interface';

export interface EventBuilder {
  build(): IEvent;
}
