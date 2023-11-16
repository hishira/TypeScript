import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateGroupCommand } from 'src/commands/group/UpdateGroupCommand';
import { IGroup } from 'src/schemas/Interfaces/group.interface';
import { Repository } from 'src/schemas/Interfaces/repository.interface';

@CommandHandler(UpdateGroupCommand)
export class UpdateGroupCommandHandler
  implements ICommandHandler<UpdateGroupCommand>
{
  constructor(
    @Inject(Repository) private readonly groupRepository: Repository<IGroup>,
  ) {}

  execute(command: UpdateGroupCommand): Promise<any> {
    const { groupId, editGroupDTO } = command;
    return this.groupRepository.update({ _id: groupId, ...editGroupDTO });
  }
}
