import { Connection } from 'mongoose';
import MetaSchema from 'src/schemas/meta.schema';

export const metaProviders = [
  {
    provide: 'META_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Meta', MetaSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
