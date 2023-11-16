import { DeleteGroupInput } from './DeleteGroupInput';

export class DeleteGroupCommand {
  constructor(public readonly deleteGroupInput: DeleteGroupInput) {}
}
