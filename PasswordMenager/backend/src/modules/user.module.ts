import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserHandler } from 'src/handlers/commands/user/createUserHandler';
import { UpdateUserHandler } from 'src/handlers/commands/user/updateUserHandler';
import { GetAllUserQueryHandler } from 'src/handlers/queries/user/getAllUserHandler.queries';
import { GetFilteredUserQueryHandler } from 'src/handlers/queries/user/getFilteredUserhandler.queries';
import { UserRepository } from 'src/repository/user.repository';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { UsersController } from '../controllers/user.contaoller';
import { userProviders } from '../providers/user.providers';
import { UserService } from '../services/user.service';
import { DatabaseModule } from './database.module';
import { HistoryModule } from './history.module';
import { LoggerModule } from './logger.module';
const commandHandles = [CreateUserHandler];
@Module({
  imports: [DatabaseModule, CqrsModule, LoggerModule],
  providers: [
    {
      provide: Repository,
      useClass: UserRepository,
    },
    ...userProviders,
    CreateUserHandler,
    GetAllUserQueryHandler,
    GetFilteredUserQueryHandler,
    UpdateUserHandler,
  ],
  exports: [
    CreateUserHandler,
    GetAllUserQueryHandler,
    GetFilteredUserQueryHandler,
    UpdateUserHandler,
  ],
})
export class UserCommandsModule {}

@Module({
  imports: [
    DatabaseModule,
    HistoryModule,
    CqrsModule,
    UserCommandsModule,
    LoggerModule,
  ],
  controllers: [UsersController],
  providers: [
    {
      provide: Repository,
      useClass: UserRepository,
    },
    UserService,
    ...userProviders,
  ],
  exports: [
    {
      provide: Repository,
      useClass: UserRepository,
    },
    ...userProviders,
    UserService,
  ],
})
export class UserModule {}
