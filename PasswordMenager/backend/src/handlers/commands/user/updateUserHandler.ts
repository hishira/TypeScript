import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserCommand } from 'src/commands/user/UpdateUserCommand';
import { IUser } from 'src/schemas/Interfaces/user.interface';
import { BaseCommandHandler } from '../BaseCommandHandler';
import { isDefined } from 'src/utils/utils';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler
  extends BaseCommandHandler<IUser>
  implements ICommandHandler<UpdateUserCommand>
{
  execute(command: UpdateUserCommand): Promise<unknown> {
    Object.keys(command.userEditDto).forEach((userKey) => {
      if (!isDefined(command.userEditDto[userKey]))
        delete command.userEditDto[userKey];
    });
    return this.repository.update({
      _id: command.userId,
      ...{
        ...command.userEditDto,
        defaultPasswordForEntries: command.userEditDto.importPassword,
      },
    });
  }
}
