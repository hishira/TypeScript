import { DeleteEntryInput } from './DeleteEntryInput';

export class DeleteEntryCommand {
  constructor(public readonly deleteEntryInput: DeleteEntryInput) {}
}
