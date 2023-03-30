import { Connection } from 'mongoose';
import EntrySchema from '../schemas/entry.schema';
export const entryProviders = [
  {
    provide: 'ENTRY_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Entry', EntrySchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
