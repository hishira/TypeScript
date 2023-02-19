import { Module } from '@nestjs/common';
import { UsersController } from '../controllers/user.contaoller';
import { UserService } from '../services/user.service';
import { userProviders } from '../providers/user.providers';
import { DatabaseModule } from './database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UserService, ...userProviders],
})
export class UserModule {}
