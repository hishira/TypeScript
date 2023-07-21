import { Connection, Model } from 'mongoose';
import { MongoDbProvider } from './mongodb.provider';
import ImportRequestSchema from 'src/schemas/importRequest.schema';

export class ImportRequestProvider extends MongoDbProvider {
  constructor(public provide: string = 'IMPORT_REQUEST_MODEL') {
    super();
  }

  useFactory(
    connection: Connection,
  ): Model<any, unknown, unknown, unknown, any> {
    return connection.model('ImportRequest', ImportRequestSchema);
  }
}
