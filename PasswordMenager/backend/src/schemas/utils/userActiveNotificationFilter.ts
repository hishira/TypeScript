import { FilterOption } from '../Interfaces/filteroption.interface';
import { NotificationChannel } from '../Interfaces/notification.interface';

export class UserActiveNotificationFilter implements FilterOption {
  constructor(
    public readonly userid: string,
    public readonly active: boolean = true,
    public readonly notificationChannel: NotificationChannel = NotificationChannel.Email,
  ) {}

  getOption(): unknown {
    return {
      active: this.active,
      notificationChannel: this.notificationChannel,
      userid: this.userid,
    };
  }
}
