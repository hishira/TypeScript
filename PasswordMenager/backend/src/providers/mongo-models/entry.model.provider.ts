import { Connection, Model } from 'mongoose';
import EntrySchema from 'src/schemas/entry.schema';
import { MongoDbProvider } from './mongodb.provider';
import { IEntry } from 'src/schemas/Interfaces/entry.interface';

export class EntryProvider extends MongoDbProvider {
  constructor(public provide: string = 'ENTRY_MODEL') {
    super();
  }

  useFactory(connection: Connection): Model<IEntry> {
    return connection.model('Entry', EntrySchema);
  }
}
