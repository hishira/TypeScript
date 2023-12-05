import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateGrouCommandpHandler } from 'src/handlers/commands/group/createGroupHandler';
import { DeleteGroupCommandHandler } from 'src/handlers/commands/group/deleteGroupHandler';
import { UpdateGroupCommandHandler } from 'src/handlers/commands/group/updateGroupHandler';
import { GetFilteredGroupQueryHandler } from 'src/handlers/queries/group/getFilteredGroup.queries';
import { groupProviders } from 'src/providers/group.providers';
import { GroupRepository } from 'src/repository/group.repository';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { GroupService } from 'src/services/group.service';
import { DatabaseModule } from './database.module';
import { ExperimentModule } from './experiment.module';
import { HistoryModule } from './history.module';

@Module({
  imports: [DatabaseModule, ExperimentModule, HistoryModule, CqrsModule],
  providers: [
    {
      provide: Repository,
      useClass: GroupRepository,
    },
    GroupService,
    ...groupProviders,
    CreateGrouCommandpHandler,
    //GetFilteredUserQueryHandler,
    GetFilteredGroupQueryHandler,
    DeleteGroupCommandHandler,
    UpdateGroupCommandHandler,
  ],
  exports: [GroupService],
})
export class GroupExtModule {}
