import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './modules/auth.module';
import { EntryModule } from './modules/entry.module';
import { EventModule } from './modules/event.module';
import { ExportModule } from './modules/export.module';
import { GroupModule } from './modules/group.module';
import { ImportModule } from './modules/import.module';
import { LoggerModule } from './modules/logger.module';
import { NotificationModule } from './modules/notification.module';
import { UserModule } from './modules/user.module';
import { RequestLogger } from './utils/RequestLogger';
const NestModules = [
  ConfigModule.forRoot(),
  ScheduleModule.forRoot(),
  EventEmitterModule.forRoot(),
];
@Module({
  imports: [
    UserModule,
    LoggerModule,
    AuthModule,
    GroupModule,
    EntryModule,
    ExportModule,
    EventModule,
    ImportModule,
    NotificationModule,
    EventModule,
    ...NestModules,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RequestLogger).forRoutes('*');
  }
}
