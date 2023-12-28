import { Schema } from 'mongoose';
import {
  INotification,
  NotificationChannel,
} from './Interfaces/notification.interface';
const NotificationDateGet = (date: any) => {
  console.log(date instanceof Date);
  if (typeof date === 'object' && date instanceof Date) {
    console.log(date.toISOString().split('T')[0]);
    return date.toISOString().split('T')[0];
  }
  return date;
};
const NotificationSchema = new Schema<INotification>(
  {
    entryId: {
      type: Schema.Types.ObjectId,
      default: null,
      ref: 'Entry',
    },
    notificationDate: {
      type: Date,
      default: Date.now(),
      get: NotificationDateGet,
    },
    notificationChannel: {
      type: String,
      enum: Object.values(NotificationChannel).concat([null]),
      default: NotificationChannel.Email,
    },
    active: {
      type: Boolean,
      default: true,
    },
    userid: {
      type: Schema.Types.ObjectId,
      default: null,
    },
  },
  { toJSON: { getters: true } },
);

export default NotificationSchema;
