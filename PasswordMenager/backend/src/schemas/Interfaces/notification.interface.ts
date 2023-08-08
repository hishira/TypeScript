import { Document, Schema } from 'mongoose';
import { FilterOption } from './filteroption.interface';
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
