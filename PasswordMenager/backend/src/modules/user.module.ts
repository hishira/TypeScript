import { Module } from '@nestjs/common';
import { UsersController } from '../controllers/user.contaoller';
import { UserService } from '../services/user.service';
import { userProviders } from '../providers/user.providers';
import { DatabaseModule } from './database.module';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { UserRepository } from 'src/repository/user.repository';
import { HistoryModule } from './history.module';

@Module({
  imports: [DatabaseModule, HistoryModule],
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
    UserService,
  ],
})
export class UserModule {}
