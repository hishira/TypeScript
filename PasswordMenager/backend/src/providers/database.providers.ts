import {
  FactoryProvider,
  InjectionToken,
  OptionalFactoryDependency,
  Scope,
} from '@nestjs/common';
import * as mongoose from 'mongoose';

abstract class Provider implements FactoryProvider {
  provide: InjectionToken;
  abstract useFactory(...args: any[]): any;
}
export class DatabeseProvider extends Provider {
  provide = 'DATABASE_CONNECTION';
  override useFactory(...args: any[]): Promise<typeof mongoose> {
    return mongoose.connect(
      `mongodb+srv://admin:${process.env.password}@cluster0.vutkdqa.mongodb.net/PasswordManager?retryWrites=true&w=majority`,
    );
  }
}
export const databaseProviders = [new DatabeseProvider()];
