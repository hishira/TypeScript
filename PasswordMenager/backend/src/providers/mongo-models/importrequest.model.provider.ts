import { Connection, Model } from 'mongoose';
import { MongoDbProvider } from './mongodb.provider';
import ImportRequestSchema from 'src/schemas/importRequest.schema';
import { ImportRequest } from 'src/schemas/Interfaces/importRequest.interface';

export class ImportRequestProvider extends MongoDbProvider {
  constructor(public provide: string = 'IMPORT_REQUEST_MODEL') {
    super();
  }

  useFactory(connection: Connection): Model<ImportRequest> {
    return connection.model('ImportRequest', ImportRequestSchema);
  }
}
