import { Module } from '@nestjs/common';
import { GroupController } from '../controllers/group.controller';
import { GroupService } from '../services/group.service';
import { groupProviders } from '../providers/group.providers';
import { DatabaseModule } from './database.module';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { GroupRepository } from 'src/repository/group.repository';
import { EntryService } from 'src/services/entry.service';

@Module({
  imports: [DatabaseModule],
  controllers: [GroupController],
  providers: [
    {
      provide: Repository,
      useClass: GroupRepository,
    },
    GroupService,
    EntryService,
    ...groupProviders,
  ],
})
export class GroupModule {}
