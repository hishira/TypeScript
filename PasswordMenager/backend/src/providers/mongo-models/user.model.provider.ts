import { Connection } from 'mongoose';
import UserSchema from 'src/schemas/user.schema';
import { MongoDbProvider } from './mongodb.provider';

export class UserProvider extends MongoDbProvider {
  constructor(public provide: string = 'USER_MODEL') {
    super();
  }

  useFactory(connection: Connection) {
    return connection.model('User', UserSchema);
  }
}
