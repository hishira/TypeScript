import * as mongoose from 'mongoose';
import NotificationSchema from 'src/schemas/notification.scheme';
export const notificationProviders = [
  {
    provide: 'NOTIFICATION_MODEL',
    useFactory: (connection: mongoose.Connection) =>
      connection.model('Notification', NotificationSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
