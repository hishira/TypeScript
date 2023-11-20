import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateNotificationCommand } from 'src/commands/notification/CreateNotificationCommand';
import { BaseCommandHandler } from '../BaseCommandHandler';
import { INotification } from 'src/schemas/Interfaces/notification.interface';

@CommandHandler(CreateNotificationCommand)
export class CreateNotificationCommandHandler
  extends BaseCommandHandler<INotification>
  implements ICommandHandler<CreateNotificationCommand>
{
  execute(command: CreateNotificationCommand): Promise<any> {
    const { notificationDto } = command;
    return this.repository.create(notificationDto);
  }
}
