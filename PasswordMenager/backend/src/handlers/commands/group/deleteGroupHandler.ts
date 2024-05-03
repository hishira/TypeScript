import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteGroupCommand } from 'src/commands/group/DeleteGroupCommand';
import { IGroup } from 'src/schemas/Interfaces/group.interface';
import { GroupOptionBuilder } from 'src/schemas/utils/builders/groupOption.builder';
import { BaseCommandHandler } from '../BaseCommandHandler';
import { BaseError } from 'src/errors/bace-error';

@CommandHandler(DeleteGroupCommand)
export class DeleteGroupCommandHandler
  extends BaseCommandHandler<IGroup>
  implements ICommandHandler<DeleteGroupCommand, IGroup | BaseError>
{
  execute(command: DeleteGroupCommand): Promise<IGroup | BaseError> {
    const { deleteGroupInput } = command;
    const deleteOption = new GroupOptionBuilder()
      .updateId(deleteGroupInput.id)
      .getOption();
    return this.repository.delete(deleteOption);
  }
}
