import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteGroupCommand } from 'src/commands/group/DeleteGroupCommand';
import {
  GroupOptionBuilder,
  IGroup,
} from 'src/schemas/Interfaces/group.interface';
import { BaseCommandHandler } from '../BaseCommandHandler';

@CommandHandler(DeleteGroupCommand)
export class DeleteGroupCommandHandler
  extends BaseCommandHandler<IGroup>
  implements ICommandHandler<DeleteGroupCommand, unknown>
{
  execute(command: DeleteGroupCommand): Promise<unknown> {
    const { deleteGroupInput } = command;
    const deleteOption = new GroupOptionBuilder()
      .updateId(deleteGroupInput.id)
      .getOption();
    return this.repository.delete(deleteOption);
  }
}
