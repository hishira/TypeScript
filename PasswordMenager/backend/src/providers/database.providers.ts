import * as mongoose from 'mongoose';
export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(
        `mongodb+srv://admin:${process.env.password}@cluster0.vutkdqa.mongodb.net/PasswordManager?retryWrites=true&w=majority`,
      ),
  },
];
