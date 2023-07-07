import { Connection } from 'mongoose';
import EntrySchema from 'src/schemas/entry.schema';
import { MongoDbProvider } from './mongodb.provider';

export class EntryProvider extends MongoDbProvider {
  constructor(public provide: string = 'ENTRY_MODEL') {
    super();
  }

  useFactory(connection: Connection) {
    return connection.model('Entry', EntrySchema);
  }
}
