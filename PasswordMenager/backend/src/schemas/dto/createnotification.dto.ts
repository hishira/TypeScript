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

  @IsString()
  readonly userid;

  toObject(): Record<string, unknown> {
    return {
      entryId: this.entryId,
      notificationDate: this.notificationDate,
      notificationChannel: this.notificationChannel,
      userid: this.userid,
    };
  }
}

export class CreateNotificationEmailDTO extends CreateNotificationDTO {
  constructor(
    public readonly entryId: string,
    public readonly notificationDate: Date | string,
    public readonly userid: string,
    public readonly notificationChannel: NotificationChannel = NotificationChannel.Email,
  ) {
    super();
  }
}
