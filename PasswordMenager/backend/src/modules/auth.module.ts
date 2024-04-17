import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { GetFilteredUserQueryHandler } from 'src/handlers/queries/user/getFilteredUserhandler.queries';
import { userProviders } from 'src/providers/user.providers';
import { UserRepository } from 'src/repository/user.repository';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { JwtStrategy } from '../accesstoken.strategy';
import { jwtConstants } from '../constans';
import { AuthController } from '../controllers/auth.controller';
import { LocalStrategy } from '../local.strategy';
import { groupProviders } from '../providers/group.providers';
import { JwtStrategy2 } from '../refreshtoken.strategy';
import { AuthService } from '../services/auth.service';
import { DatabaseModule } from './database.module';
import { UserModule } from './user.module';
import { LoggerModule } from './logger.module';
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
    CqrsModule,
    LoggerModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    JwtStrategy2,
    ...groupProviders,
    GetFilteredUserQueryHandler,
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
