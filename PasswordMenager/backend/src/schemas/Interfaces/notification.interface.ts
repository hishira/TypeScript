import { Document, Schema } from 'mongoose';
import { FilterOption } from './filteroption.interface';
import { Paginator } from 'src/utils/paginator';
export enum NotificationChannel {
  Account = 'Account',
  Email = 'Email',
  Sms = 'Sms',
}
export interface INotification extends Document {
  readonly entryId: Schema.Types.ObjectId;
  readonly notificationDate: Date;
  readonly notificationChannel: NotificationChannel;
  readonly active: boolean;
  readonly userid: Schema.Types.ObjectId;
}

export class ActiveNotificationFilter implements FilterOption {
  constructor(
    public readonly active: boolean = true,
    public readonly notificationChannel: NotificationChannel = NotificationChannel.Email,
  ) {}

  getOption(): unknown {
    return {
      active: this.active,
      notificationChannel: this.notificationChannel,
    };
  }
}

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

export class NotificationUtils {
  static SendNotification(notification: INotification): boolean {
    return (
      notification.active &&
      notification.notificationDate < new Date(Date.now())
    );
  }

  static get GetAllNotificationFilter(): FilterOption<unknown> {
    return { getOption: () => ({}) };
  }

  static GetDataFromPaginator(
    data:
      | INotification[]
      | {
          data: INotification[];
          pageInfo: Paginator;
        },
  ): INotification[] {
    return Array.isArray(data) ? data : data.data;
  }
}
