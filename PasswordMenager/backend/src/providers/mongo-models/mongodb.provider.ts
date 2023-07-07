import { Connection, Model } from 'mongoose';

export abstract class MongoDbProvider {
  inject: string[] = ['DATABASE_CONNECTION'];
  provide: string;
  abstract useFactory(connection: Connection): Model<any>;
}
