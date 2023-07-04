import { IsDate, IsEnum, IsString } from 'class-validator';
import { NotificationChannel } from '../Interfaces/notification.interface';
import { DTO } from './object.interface';

export class CreateNotificationDTO implements DTO {
  @IsString()
  readonly entryId: string;
  @IsDate()
  readonly notificationDate;

  @IsString()
  @IsEnum(NotificationChannel)
  readonly notificationChannel;

  toObject(): Record<string, unknown> {
    return {
      entryId: this.entryId,
      notificationDate: this.notificationDate,
      notificationChannel: this.notificationChannel,
    };
  }
}
