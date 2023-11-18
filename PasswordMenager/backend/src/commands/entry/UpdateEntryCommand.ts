import { UpdateEntryInput } from './UpdateEntryInput';

export class UpdateEntryCommand {
  constructor(public readonly input: UpdateEntryInput) {}
}
