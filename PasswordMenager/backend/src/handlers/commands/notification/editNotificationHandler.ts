import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EditNotificationCommand } from 'src/commands/notification/EditNotificationCommand';
import { INotification } from 'src/schemas/Interfaces/notification.interface';
import { BaseCommandHandler } from '../BaseCommandHandler';

@CommandHandler(EditNotificationCommand)
export class EditNotificationHandler
  extends BaseCommandHandler<INotification>
  implements ICommandHandler<EditNotificationCommand>
{
  execute(command: EditNotificationCommand): Promise<any> {
    const { notificationInput } = command;
    const partialNotification: Partial<INotification> = {
      ...notificationInput,
    };
    if ('_id' in partialNotification) delete partialNotification._id;
    return this.repository.update(partialNotification);
  }
}
