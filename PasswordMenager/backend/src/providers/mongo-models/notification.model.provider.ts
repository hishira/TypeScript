import { Connection, Model } from 'mongoose';
import { MongoDbProvider } from './mongodb.provider';
import NotificationSchema from 'src/schemas/notification.scheme';

export class NotificationProvider extends MongoDbProvider {
  constructor(public provide: string = 'NOTIFICATION_MODEL') {
    super();
  }

  useFactory(
    connection: Connection,
  ): Model<any, unknown, unknown, unknown, any> {
    return connection.model('Notification', NotificationSchema);
  }
}
