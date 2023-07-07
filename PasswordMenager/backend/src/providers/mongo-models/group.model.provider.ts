import { Connection, Model } from 'mongoose';
import GroupSchema from 'src/schemas/group.schema';
import { MongoDbProvider } from './mongodb.provider';

export class GroupProvider extends MongoDbProvider {
  constructor(public provide: string = 'GROUP_MODEL') {
    super();
  }

  useFactory(
    connection: Connection,
  ): Model<any, unknown, unknown, unknown, any> {
    return connection.model('Group', GroupSchema);
  }
}
