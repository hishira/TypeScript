import { Module } from '@nestjs/common';
import { GroupRepository } from 'src/repository/group.repository';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { GroupController } from '../controllers/group.controller';
import { groupProviders } from '../providers/group.providers';
import { GroupService } from '../services/group.service';
import { DatabaseModule } from './database.module';
import { ExperimentModule } from './experiment.module';
import { HistoryModule } from './history.module';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateGrouCommandpHandler } from 'src/handlers/commands/group/createGroupHandler';
import { GetFilteredUserQueryHandler } from 'src/handlers/queries/user/getFilteredUserhandler.queries';
import { GetFilteredGroupQueryHandler } from 'src/handlers/queries/group/getFilteredGroup.queries';
import { DeleteGroupCommandHandler } from 'src/handlers/commands/group/deleteGroupHandler';
import { UpdateGroupCommandHandler } from 'src/handlers/commands/group/updateGroupHandler';
import { LoggerModule } from './logger.module';

@Module({
  imports: [DatabaseModule, ExperimentModule, HistoryModule, CqrsModule, LoggerModule],
  controllers: [GroupController],
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
})
export class GroupModule {}
