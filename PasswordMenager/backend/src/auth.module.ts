import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserService } from './user.service';
import { UserModule } from './user.module';
import { userProviders } from './user.providers';
import { DatabaseModule } from './database.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constans';
import { JwtStrategy } from './accesstoken.strategy';
import { JwtStrategy2 } from './refreshtoken.strategy';
@Module({
  imports: [
    DatabaseModule,
    UserModule,
    PassportModule.register({
      defaultStrategy: ['accessToken',],
    }),
    JwtModule.register({
      secret: jwtConstants.secret,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, UserService, ...userProviders,JwtStrategy,JwtStrategy2],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
