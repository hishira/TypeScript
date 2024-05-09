import { Connection, Model } from 'mongoose';
import { MongoDbProvider } from './mongodb.provider';
import NotificationSchema from 'src/schemas/notification.scheme';
import { INotification } from 'src/schemas/Interfaces/notification.interface';

export class NotificationProvider extends MongoDbProvider {
  constructor(public provide: string = 'NOTIFICATION_MODEL') {
    super();
  }

  useFactory(connection: Connection): Model<INotification> {
    return connection.model('Notification', NotificationSchema);
  }
}
