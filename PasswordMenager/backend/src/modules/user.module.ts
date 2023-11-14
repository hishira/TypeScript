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
const commandHandles = [CreateUserHandler];
@Module({
  imports: [DatabaseModule, HistoryModule, CqrsModule],
  controllers: [UsersController],
  providers: [
    {
      provide: Repository,
      useClass: UserRepository,
    },
    UserService,
    ...userProviders,
    CreateUserHandler,
    GetAllUserQueryHandler,
    GetFilteredUserQueryHandler,
    UpdateUserHandler,
  ],
  exports: [
    {
      provide: Repository,
      useClass: UserRepository,
    },
    UserService,
    CreateUserHandler,
  ],
})
export class UserModule {}
