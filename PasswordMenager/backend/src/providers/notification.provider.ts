import * as mongoose from 'mongoose';
import NotificationSchema from 'src/schemas/notification.scheme';
export const notificationProviders = [
  {
    provide: 'NOTIFICATION_CONNECTION',
    useFactory: (connection: mongoose.Connection) =>
      connection.model('Notification', NotificationSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
