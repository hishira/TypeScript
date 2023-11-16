import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteGroupCommand } from 'src/commands/group/DeleteGroupCommand';
import {
  GroupOptionBuilder,
  IGroup,
} from 'src/schemas/Interfaces/group.interface';
import { Repository } from 'src/schemas/Interfaces/repository.interface';

@CommandHandler(DeleteGroupCommand)
export class DeleteGroupCommandHandler
  implements ICommandHandler<DeleteGroupCommand, unknown>
{
  constructor(
    @Inject(Repository) private readonly groupRepository: Repository<IGroup>,
  ) {}

  execute(command: DeleteGroupCommand): Promise<unknown> {
    const { deleteGroupInput } = command;
    const deleteOption = new GroupOptionBuilder()
      .updateId(deleteGroupInput.id)
      .getOption();
    return this.groupRepository.delete(deleteOption);
  }
}
