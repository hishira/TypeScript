import { Module } from '@nestjs/common';
import { GroupRepository } from 'src/repository/group.repository';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { GroupController } from '../controllers/group.controller';
import { groupProviders } from '../providers/group.providers';
import { GroupService } from '../services/group.service';
import { DatabaseModule } from './database.module';
import { ExperimentModule } from './experiment.module';
import { HistoryModule } from './history.module';

@Module({
  imports: [DatabaseModule, ExperimentModule, HistoryModule],
  controllers: [GroupController],
  providers: [
    {
      provide: Repository,
      useClass: GroupRepository,
    },
    GroupService,
    ...groupProviders,
  ],
})
export class GroupModule {}
