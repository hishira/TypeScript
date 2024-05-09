import { Connection, Model } from 'mongoose';
import { MongoDbProvider } from './mongodb.provider';
import HistorySchema from 'src/schemas/history.schema';
import { IHistory } from 'src/schemas/Interfaces/history.interface';

export class HistoryProvider extends MongoDbProvider {
  constructor(public provide: string = 'HISTORY_MODEL') {
    super();
  }

  useFactory(connection: Connection): Model<IHistory> {
    return connection.model('History', HistorySchema);
  }
}
