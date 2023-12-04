import { Module } from '@nestjs/common';
import { UsersController } from '../controllers/user.contaoller';
import { UserService } from '../services/user.service';
import { userProviders } from '../providers/user.providers';
import { DatabaseModule } from './database.module';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { UserRepository } from 'src/repository/user.repository';
import { HistoryModule } from './history.module';
import { CreateUserHandler } from 'src/handlers/commands/user/createUserHandler';
import { CqrsModule } from '@nestjs/cqrs';
import { GetAllUserQueryHandler } from 'src/handlers/queries/user/getAllUserHandler.queries';
import { UpdateUserHandler } from 'src/handlers/commands/user/updateUserHandler';
import { GetFilteredUserQueryHandler } from 'src/handlers/queries/user/getFilteredUserhandler.queries';
import { CreateHisotryHandler } from 'src/handlers/commands/history/createHistoryHandler';
const commandHandles = [CreateUserHandler];
@Module({
  imports: [DatabaseModule, CqrsModule],
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
    CreateHisotryHandler,
  ],
  exports: [
    CreateUserHandler,
    GetAllUserQueryHandler,
    GetFilteredUserQueryHandler,
    UpdateUserHandler,
    CreateHisotryHandler,
  ],
})
export class UserCommandsModule {}

@Module({
  imports: [DatabaseModule, HistoryModule, CqrsModule, UserCommandsModule],
  controllers: [UsersController],
  providers: [
    {
      provide: Repository,
      useClass: UserRepository,
    },
    UserService,
    ...userProviders,
    // CreateUserHandler,
    // GetAllUserQueryHandler,
    // GetFilteredUserQueryHandler,
    // UpdateUserHandler,
    // CreateHisotryHandler,
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
