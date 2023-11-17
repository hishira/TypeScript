import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from 'src/commands/user/CreateUserCommand';
import { IUser, UserDTOMapper } from 'src/schemas/Interfaces/user.interface';
import { BaseCommandHandler } from '../BaseCommandHandler';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler
  extends BaseCommandHandler<IUser>
  implements ICommandHandler<CreateUserCommand>
{
  execute(command: CreateUserCommand): Promise<IUser> {
    return this.repository.create(
      UserDTOMapper.GetDTOFromCreateUserDTO({
        email: command.email,
        login: command.login,
        password: command.password,
      }),
    );
  }
}
