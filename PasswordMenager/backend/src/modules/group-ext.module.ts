import { Module } from '@nestjs/common';
import { groupProviders } from 'src/providers/group.providers';
import { GroupRepository } from 'src/repository/group.repository';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { GroupService } from 'src/services/group.service';
import { DatabaseModule } from './database.module';
import { ExperimentModule } from './experiment.module';
import { HistoryModule } from './history.module';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateGrouCommandpHandler } from 'src/handlers/commands/group/createGroupHandler';
import { GetFilteredUserQueryHandler } from 'src/handlers/queries/user/getFilteredUserhandler.queries';
import { GetFilteredGroupQueryHandler } from 'src/handlers/queries/group/getFilteredGroup.queries';
import { DeleteGroupCommandHandler } from 'src/handlers/commands/group/deleteGroupHandler';
import { UpdateGroupCommandHandler } from 'src/handlers/commands/group/updateGroupHandler';

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
    GetFilteredUserQueryHandler,
    GetFilteredGroupQueryHandler,
    DeleteGroupCommandHandler,
    UpdateGroupCommandHandler,
  ],
  exports: [GroupService],
})
export class GroupExtModule {}
