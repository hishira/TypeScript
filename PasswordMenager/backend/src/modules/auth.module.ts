import { Module } from '@nestjs/common';
import { AuthController } from '../controllers/auth.controller';
import { UserService } from '../services/user.service';
import { UserModule } from './user.module';
import { userProviders } from '../providers/user.providers';
import { DatabaseModule } from './database.module';
import { AuthService } from '../services/auth.service';
import { LocalStrategy } from '../local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../constans';
import { JwtStrategy } from '../accesstoken.strategy';
import { JwtStrategy2 } from '../refreshtoken.strategy';
import {GroupModule} from "./group.module"
import {GroupService} from "../services/group.service"
import { groupProviders } from '../providers/group.providers';
@Module({
  imports: [
    DatabaseModule,
    UserModule,
    GroupModule,
    PassportModule.register({
      defaultStrategy: ['accessToken',],
    }),
    JwtModule.register({
      secret: jwtConstants.secret,
    }),
  ],
  controllers: [AuthController],
  providers: [GroupService, AuthService, LocalStrategy, UserService, ...userProviders,JwtStrategy,JwtStrategy2, ...groupProviders],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
