import { CreateNotificationDTO } from 'src/schemas/dto/createnotification.dto';

export class CreateNotificationCommand {
  constructor(public readonly notificationDto: CreateNotificationDTO) {}
}
