import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {UserModule} from "./user.module"
import {AuthModule} from "./auth.module";
import {GroupModule} from "./group.module";
@Module({
  imports: [UserModule, AuthModule, GroupModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
