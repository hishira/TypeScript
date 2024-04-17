import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from 'src/commands/user/CreateUserCommand';
import { IUser } from 'src/schemas/Interfaces/user.interface';
import { UserDTOMapper } from 'src/schemas/mapper/userDtoMapper';
import { BaseCommandHandler } from '../BaseCommandHandler';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler
  extends BaseCommandHandler<IUser>
  implements ICommandHandler<CreateUserCommand>
{
  execute(command: CreateUserCommand): Promise<IUser | void> {
    return this.repository.create(
      UserDTOMapper.GetDTOFromCreateUserDTO({
        email: command.createUserDto.email,
        login: command.createUserDto.login,
        password: command.createUserDto.password,
      }),
    );
  }
}
