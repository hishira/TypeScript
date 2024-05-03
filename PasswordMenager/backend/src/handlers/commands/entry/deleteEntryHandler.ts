import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteEntryCommand } from 'src/commands/entry/DeleteEntryCommand';
import { IEntry } from 'src/schemas/Interfaces/entry.interface';
import { OptionModelBuilder } from 'src/schemas/utils/builders/optionModal.builder';
import { BaseCommandHandler } from '../BaseCommandHandler';
import { BaseError } from 'src/errors/bace-error';

@CommandHandler(DeleteEntryCommand)
export class DeleteEntryHandler
  extends BaseCommandHandler<IEntry>
  implements ICommandHandler<DeleteEntryCommand>
{
  execute(command: DeleteEntryCommand): Promise<IEntry | BaseError> {
    const { deleteEntryInput } = command;
    const deleteOption = new OptionModelBuilder()
      .updateEntryId(deleteEntryInput.id)
      .updateGroupId(deleteEntryInput.groupId)
      .getOption();

    return this.repository.delete(deleteOption);
  }
}
