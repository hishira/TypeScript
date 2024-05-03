import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserCommand } from 'src/commands/user/UpdateUserCommand';
import { IUser } from 'src/schemas/Interfaces/user.interface';
import { isDefined } from 'src/utils/utils';
import { BaseCommandHandler } from '../BaseCommandHandler';
import { BaseError } from 'src/errors/bace-error';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler
  extends BaseCommandHandler<IUser>
  implements ICommandHandler<UpdateUserCommand>
{
  execute(command: UpdateUserCommand): Promise<IUser | BaseError> {
    return this.repository.update(this.getPreparedPartialUpdateUser(command));
  }

  private getPreparedPartialUpdateUser(
    command: UpdateUserCommand,
  ): Partial<IUser> {
    Object.keys(command.userEditDto).forEach((userKey) => {
      if (!isDefined(command.userEditDto[userKey]))
        delete command.userEditDto[userKey];
    });

    return {
      _id: command.userId,
      ...{
        ...command.userEditDto,
        defaultPasswordForEntries: command.userEditDto.importPassword,
      },
    };
  }
}
