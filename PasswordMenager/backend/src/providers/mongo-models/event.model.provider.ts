import { Connection, Model } from 'mongoose';
import EventSchema from 'src/schemas/event.schema';
import { MongoDbProvider } from './mongodb.provider';
import { IEvent } from 'src/schemas/Interfaces/event.interface';

export class EventProvider extends MongoDbProvider {
  constructor(public provide: string = 'EVENT_MODEL') {
    super();
  }

  useFactory(connection: Connection): Model<IEvent> {
    return connection.model('Event', EventSchema);
  }
}
