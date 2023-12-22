import { Schema } from 'mongoose';
import {
  INotification,
  NotificationChannel,
} from './Interfaces/notification.interface';
const NotificationSchema = new Schema<INotification>({
  entryId: {
    type: Schema.Types.ObjectId,
    default: null,
    ref: 'Entry',
  },
  notificationDate: {
    type: Date,
    default: Date.now(),
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
});

export default NotificationSchema;
