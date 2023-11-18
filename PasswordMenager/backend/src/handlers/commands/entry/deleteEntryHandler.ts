import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteEntryCommand } from 'src/commands/entry/DeleteEntryCommand';
import { BaseCommandHandler } from '../BaseCommandHandler';
import {
  IEntry,
  OptionModelBuilder,
} from 'src/schemas/Interfaces/entry.interface';

@CommandHandler(DeleteEntryCommand)
export class DeleteEntryHandler
  extends BaseCommandHandler<IEntry>
  implements ICommandHandler<DeleteEntryCommand>
{
  execute(command: DeleteEntryCommand): Promise<any> {
    const { deleteEntryInput } = command;
    //TODO: refactor
    if ('id' in deleteEntryInput) {
      const deleteOption = new OptionModelBuilder()
        .updateEntryId(deleteEntryInput.id)
        .getOption();
      return this.repository.delete(deleteOption);
    }
    if ('groupId' in deleteEntryInput) {
      const deleteOption = new OptionModelBuilder()
        .updateGroupId(deleteEntryInput.groupId)
        .getOption();

      return this.repository.delete(deleteOption);
    }
  }
}
