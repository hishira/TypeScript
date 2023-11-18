import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ExportController } from 'src/controllers/export.controller';
import { CreateEntryBulkHandler } from 'src/handlers/commands/entry/createEntryBulkHandler';
import { CreateEntryHandler } from 'src/handlers/commands/entry/createEntryHandler';
import { DeleteEntryHandler } from 'src/handlers/commands/entry/deleteEntryHandler';
import { GetExistingGroupQueryHandler } from 'src/handlers/queries/group/getExistingGroup.queries';
import { entryProviders } from 'src/providers/entry.providers';
import { EntryRepository } from 'src/repository/entry.repository';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { EntryService } from 'src/services/entry.service';
import { ExportService } from 'src/services/export.service';
import { DatabaseModule } from './database.module';
import { HistoryModule } from './history.module';
import { UpdateEntryHandler } from 'src/handlers/commands/entry/updateEntryHandler';

@Module({
  imports: [DatabaseModule, HistoryModule, CqrsModule],
  controllers: [ExportController],
  providers: [
    {
      provide: Repository,
      useClass: EntryRepository,
    },
    EntryService,
    ...entryProviders,
    ExportService,
    CreateEntryHandler,
    GetExistingGroupQueryHandler,
    CreateEntryBulkHandler,
    DeleteEntryHandler,
    UpdateEntryHandler,
  ],
})
export class ExportModule {}
