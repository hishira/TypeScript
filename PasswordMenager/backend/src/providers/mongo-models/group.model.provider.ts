import { Connection, Model } from 'mongoose';
import GroupSchema from 'src/schemas/group.schema';
import { MongoDbProvider } from './mongodb.provider';
import { IGroup } from 'src/schemas/Interfaces/group.interface';

export class GroupProvider extends MongoDbProvider {
  constructor(public provide: string = 'GROUP_MODEL') {
    super();
  }

  useFactory(connection: Connection): Model<IGroup> {
    return connection.model('Group', GroupSchema);
  }
}
