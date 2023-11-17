import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserCommand } from 'src/commands/user/UpdateUserCommand';
import { IUser } from 'src/schemas/Interfaces/user.interface';
import { BaseCommandHandler } from '../BaseCommandHandler';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler
  extends BaseCommandHandler<IUser>
  implements ICommandHandler<UpdateUserCommand>
{
  execute(command: UpdateUserCommand): Promise<unknown> {
    return this.repository.update({
      _id: command.userId,
      ...command.userEditDto,
    });
  }
}
