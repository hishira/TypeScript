import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateGroupCommand } from 'src/commands/group/CreateGroupCommand';
import { IGroup } from 'src/schemas/Interfaces/group.interface';
import { GroupDtoMapper } from 'src/schemas/mapper/groupDtoMapper';
import { BaseCommandHandler } from '../BaseCommandHandler';
import { BaseError } from 'src/errors/bace-error';
@CommandHandler(CreateGroupCommand)
export class CreateGrouCommandpHandler
  extends BaseCommandHandler<IGroup>
  implements ICommandHandler<CreateGroupCommand>
{
  execute(command: CreateGroupCommand): Promise<IGroup | BaseError> {
    const { userid, groupCreateDTO } = command;
    return this.repository.create(
      GroupDtoMapper.CreatePureGroupDTO(userid, groupCreateDTO),
    );
  }
}
