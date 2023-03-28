import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../accesstoken.strategy';
import { jwtConstants } from '../constans';
import { AuthController } from '../controllers/auth.controller';
import { LocalStrategy } from '../local.strategy';
import { groupProviders } from '../providers/group.providers';
import { JwtStrategy2 } from '../refreshtoken.strategy';
import { AuthService } from '../services/auth.service';
import { DatabaseModule } from './database.module';
import { UserModule } from './user.module';
@Module({
  imports: [
    DatabaseModule,
    UserModule,
    PassportModule.register({
      defaultStrategy: ['accessToken'],
    }),
    JwtModule.register({
      secret: jwtConstants.secret,
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    JwtStrategy2,
    ...groupProviders,
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
