import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {UserModule} from "./modules/user.module"
import {AuthModule} from "./modules/auth.module";
import {GroupModule} from "./modules/group.module";
@Module({
  imports: [UserModule, AuthModule, GroupModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
