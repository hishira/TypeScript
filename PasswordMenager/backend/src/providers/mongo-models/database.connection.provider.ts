import { FactoryProvider, InjectionToken } from '@nestjs/common';
import mongoose from 'mongoose';
abstract class Provider implements FactoryProvider {
  provide: InjectionToken;
  abstract useFactory(...args: any[]): any;
}
export class DatabeseProvider extends Provider {
  provide = 'DATABASE_CONNECTION';
  override useFactory(...args: any[]): Promise<typeof mongoose> {
    return mongoose.connect(
      `mongodb+srv://admin:${process.env.password}${process.env.databaseurl}`,
    );
  }
}
