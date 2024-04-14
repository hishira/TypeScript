import { Connection } from 'mongoose';
import EventSchema from 'src/schemas/event.schema';
import { MongoDbProvider } from './mongodb.provider';

export class EventProvider extends MongoDbProvider {
  constructor(public provide: string = 'EVENT_MODEL') {
    super();
  }

  useFactory(connection: Connection) {
    return connection.model('Event', EventSchema);
  }
}
