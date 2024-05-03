import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateGroupCommand } from 'src/commands/group/UpdateGroupCommand';
import { IGroup } from 'src/schemas/Interfaces/group.interface';
import { BaseCommandHandler } from '../BaseCommandHandler';
import { BaseError } from 'src/errors/bace-error';

@CommandHandler(UpdateGroupCommand)
export class UpdateGroupCommandHandler
  extends BaseCommandHandler<IGroup>
  implements ICommandHandler<UpdateGroupCommand>
{
  execute(command: UpdateGroupCommand): Promise<IGroup | BaseError> {
    const { groupId, editGroupDTO } = command;
    return this.repository.update({ _id: groupId, ...editGroupDTO });
  }
}
