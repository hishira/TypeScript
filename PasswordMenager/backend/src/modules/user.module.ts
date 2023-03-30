import { Module } from '@nestjs/common';
import { UsersController } from '../controllers/user.contaoller';
import { UserService } from '../services/user.service';
import { userProviders } from '../providers/user.providers';
import { DatabaseModule } from './database.module';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { UserRepository } from 'src/repository/user.repository';
import { metaProviders } from 'src/providers/meta.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [
    {
      provide: Repository,
      useClass: UserRepository,
    },
    UserService,
    ...userProviders,
    ...metaProviders,
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
