import { Connection, Model } from 'mongoose';
import UserSchema from 'src/schemas/user.schema';
import { MongoDbProvider } from './mongodb.provider';
import { IUser } from 'src/schemas/Interfaces/user.interface';

export class UserProvider extends MongoDbProvider {
  constructor(public provide: string = 'USER_MODEL') {
    super();
  }

  useFactory(connection: Connection): Model<IUser> {
    return connection.model('User', UserSchema);
  }
}
