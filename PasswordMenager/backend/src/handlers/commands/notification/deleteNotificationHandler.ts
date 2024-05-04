import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteNotificationCommand } from 'src/commands/notification/DeleteNotificationCommand';
import { BaseCommandHandler } from '../BaseCommandHandler';
import { INotification } from 'src/schemas/Interfaces/notification.interface';
import { BaseError } from 'src/errors/bace-error';

@CommandHandler(DeleteNotificationCommand)
export class DeleteNotificationCommandHandler
  extends BaseCommandHandler<INotification>
  implements ICommandHandler<DeleteNotificationCommand>
{
  execute(
    command: DeleteNotificationCommand,
  ): Promise<INotification | BaseError> {
    return this.repository.delete({
      getOption: () => ({ _id: command.deleteNotificationInput._id }),
    });
  }
}
