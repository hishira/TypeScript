import { Connection, Model } from 'mongoose';
import { MongoDbProvider } from './mongodb.provider';
import HistorySchema from 'src/schemas/history.schema';

export class HistoryProvider extends MongoDbProvider {
  constructor(public provide: string = 'HISTORY_MODEL') {
    super();
  }

  useFactory(
    connection: Connection,
  ): Model<any, unknown, unknown, unknown, any> {
    return connection.model('History', HistorySchema);
  }
}
