import { Schema } from 'mongoose';
import {
  INotification,
  NotificationChannel,
} from './Interfaces/notification.interface';
import { MongoDateGetter } from './utils/utils';

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
      get: MongoDateGetter,
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
