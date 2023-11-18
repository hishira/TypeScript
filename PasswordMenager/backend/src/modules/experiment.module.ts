import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateEntryBulkHandler } from 'src/handlers/commands/entry/createEntryBulkHandler';
import { CreateEntryHandler } from 'src/handlers/commands/entry/createEntryHandler';
import { DeleteEntryHandler } from 'src/handlers/commands/entry/deleteEntryHandler';
import { GetExistingGroupQueryHandler } from 'src/handlers/queries/group/getExistingGroup.queries';
import { EntryRepository } from 'src/repository/entry.repository';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { entryProviders } from '../providers/entry.providers';
import { EntryService } from '../services/entry.service';
import { DatabaseModule } from './database.module';
import { HistoryModule } from './history.module';
import { UpdateEntryHandler } from 'src/handlers/commands/entry/updateEntryHandler';
@Module({
  imports: [DatabaseModule, HistoryModule, CqrsModule],
  providers: [
    {
      provide: Repository,
      useClass: EntryRepository,
    },
    EntryService,
    ...entryProviders,
    CreateEntryHandler,
    GetExistingGroupQueryHandler,
    CreateEntryBulkHandler,
    DeleteEntryHandler,
    UpdateEntryHandler,
  ],
  exports: [EntryService],
})
export class ExperimentModule {}
