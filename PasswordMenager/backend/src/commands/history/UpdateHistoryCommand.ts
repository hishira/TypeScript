import { UpdateHistoryInput } from './UpdateHistoryInput';

export class UpdateHistoryCommand {
  constructor(public readonly input: UpdateHistoryInput) {}
}
