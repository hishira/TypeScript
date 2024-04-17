import { CreateEventCommandInput } from './EventInputCommand';

export class CreateEventCommand {
  constructor(public readonly createEventInput: CreateEventCommandInput) {}
}
