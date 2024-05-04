import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateNotificationCommand } from 'src/commands/notification/CreateNotificationCommand';
import { BaseCommandHandler } from '../BaseCommandHandler';
import { INotification } from 'src/schemas/Interfaces/notification.interface';
import { BaseError } from 'src/errors/bace-error';

@CommandHandler(CreateNotificationCommand)
export class CreateNotificationCommandHandler
  extends BaseCommandHandler<INotification>
  implements ICommandHandler<CreateNotificationCommand>
{
  execute(
    command: CreateNotificationCommand,
  ): Promise<INotification | BaseError> {
    const { notificationDto } = command;
    return this.repository.create(notificationDto);
  }
}
