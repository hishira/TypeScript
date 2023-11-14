import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from 'src/commands/user/CreateUserCommand';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { IUser, UserDTOMapper } from 'src/schemas/Interfaces/user.interface';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @Inject(Repository) private readonly userRepository: Repository<IUser>,
  ) {}
  execute(command: CreateUserCommand): Promise<IUser> {
    return this.userRepository.create(
      UserDTOMapper.GetDTOFromCreateUserDTO({
        email: command.email,
        login: command.login,
        password: command.password,
      }),
    );
  }
}
