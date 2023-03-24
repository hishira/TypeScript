import { Module } from '@nestjs/common';
import { groupProviders } from 'src/providers/group.providers';
import { GroupRepository } from 'src/repository/group.repository';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { GroupService } from 'src/services/group.service';
import { DatabaseModule } from './database.module';
import { ExperimentModule } from './experiment.module';

@Module({
  imports: [DatabaseModule, ExperimentModule],
  providers: [
    {
      provide: Repository,
      useClass: GroupRepository,
    },
    GroupService,
    ...groupProviders,
  ],
  exports: [GroupService],
})
export class GroupExtModule {}
