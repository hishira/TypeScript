import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ExportController } from 'src/controllers/export.controller';
import { CreateEntryHandler } from 'src/handlers/commands/entry/createEntryHandler';
import { DeleteEntryHandler } from 'src/handlers/commands/entry/deleteEntryHandler';
import { UpdateEntryHandler } from 'src/handlers/commands/entry/updateEntryHandler';
import { GetSpecificEntryQueryHandler } from 'src/handlers/queries/entry/getSpecificEntry.queries';
import { GetExistingGroupQueryHandler } from 'src/handlers/queries/group/getExistingGroup.queries';
import { entryProviders } from 'src/providers/entry.providers';
import { EntryRepository } from 'src/repository/entry.repository';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { EntryService } from 'src/services/entry.service';
import { ExportService } from 'src/services/export.service';
import { DatabaseModule } from './database.module';
import { HistoryModule } from './history.module';
import { LoggerModule } from './logger.module';

@Module({
  imports: [DatabaseModule, HistoryModule, CqrsModule, LoggerModule],
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
    DeleteEntryHandler,
    UpdateEntryHandler,
    GetSpecificEntryQueryHandler,
  ],
})
export class ExportModule {}
