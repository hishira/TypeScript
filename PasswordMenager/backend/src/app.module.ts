import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth.module';
import { EntryModule } from './modules/entry.module';
import { ExportModule } from './modules/export.module';
import { GroupModule } from './modules/group.module';
import { ImportModule } from './modules/import.module';
import { UserModule } from './modules/user.module';
import { ScheduleModule } from '@nestjs/schedule';
@Module({
  imports: [
    UserModule,
    AuthModule,
    GroupModule,
    EntryModule,
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    ExportModule,
    ImportModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
