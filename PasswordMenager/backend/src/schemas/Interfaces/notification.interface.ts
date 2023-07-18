import { Document, Schema } from 'mongoose';
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
}
