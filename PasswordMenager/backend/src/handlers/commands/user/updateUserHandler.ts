import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserCommand } from 'src/commands/user/UpdateUserCommand';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { IUser } from 'src/schemas/Interfaces/user.interface';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    @Inject(Repository) private readonly userRepository: Repository<IUser>,
  ) {}
  execute(command: UpdateUserCommand): Promise<unknown> {
    return this.userRepository.update({
      _id: command.userId,
      ...command.userEditDto,
    });
  }
}
