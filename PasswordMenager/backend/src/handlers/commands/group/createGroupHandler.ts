import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateGroupCommand } from 'src/commands/group/CreateGroupCommand';
import { GroupDtoMapper, IGroup } from 'src/schemas/Interfaces/group.interface';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
@CommandHandler(CreateGroupCommand)
export class CreateGrouCommandpHandler
  implements ICommandHandler<CreateGroupCommand>
{
  constructor(
    @Inject(Repository)
    private readonly groupRepository: Repository<IGroup>,
  ) {}
  execute(command: CreateGroupCommand): Promise<any> {
    const { userid, groupCreateDTO } = command;
    return this.groupRepository.create(
      GroupDtoMapper.CreatePureGroupDTO(userid, groupCreateDTO),
    );
  }
}
