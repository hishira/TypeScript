import { Module } from '@nestjs/common';
import { EntryRepository } from 'src/repository/entry.repository';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { entryProviders } from '../providers/entry.providers';
import { EntryService } from '../services/entry.service';
import { DatabaseModule } from './database.module';
import { HistoryModule } from './history.module';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateEntryHandler } from 'src/handlers/commands/entry/createEntryHandler';
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
  ],
  exports: [EntryService],
})
export class ExperimentModule {}
