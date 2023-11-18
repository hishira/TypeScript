import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateEntryBulkHandler } from 'src/handlers/commands/entry/createEntryBulkHandler';
import { CreateEntryHandler } from 'src/handlers/commands/entry/createEntryHandler';
import { DeleteEntryHandler } from 'src/handlers/commands/entry/deleteEntryHandler';
import { GetExistingGroupQueryHandler } from 'src/handlers/queries/group/getExistingGroup.queries';
import { EntryRepository } from 'src/repository/entry.repository';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { GroupExistsValidator } from 'src/validators/CheckGroup.validator';
import { ValidatorModule } from 'src/validators/validator.module';
import { EntryContoller } from '../controllers/entry.controller';
import { entryProviders } from '../providers/entry.providers';
import { EntryService } from '../services/entry.service';
import { DatabaseModule } from './database.module';
import { GroupExtModule } from './group-ext.module';
import { HistoryModule } from './history.module';
import { LoggerModule } from './logger.module';
import { NotificationModule } from './notification.module';
import { UpdateEntryHandler } from 'src/handlers/commands/entry/updateEntryHandler';
@Module({
  imports: [
    DatabaseModule,
    GroupExtModule,
    ValidatorModule,
    NotificationModule,
    LoggerModule,
    HistoryModule,
    CqrsModule,
  ],
  controllers: [EntryContoller],
  providers: [
    {
      provide: Repository,
      useClass: EntryRepository,
    },
    EntryService,
    ...entryProviders,
    GroupExistsValidator,
    CreateEntryHandler,
    GetExistingGroupQueryHandler,
    CreateEntryBulkHandler,
    DeleteEntryHandler,
    UpdateEntryHandler,
  ],
})
export class EntryModule {}
