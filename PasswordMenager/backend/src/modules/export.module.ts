import { Module } from '@nestjs/common';
import { ExportController } from 'src/controllers/export.controller';
import { entryProviders } from 'src/providers/entry.providers';
import { EntryRepository } from 'src/repository/entry.repository';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { EntryService } from 'src/services/entry.service';
import { ExportService } from 'src/services/export.service';
import { DatabaseModule } from './database.module';
import { HistoryModule } from './history.module';

@Module({
  imports: [DatabaseModule, HistoryModule],
  controllers: [ExportController],
  providers: [
    {
      provide: Repository,
      useClass: EntryRepository,
    },
    EntryService,
    ...entryProviders,
    ExportService,
  ],
})
export class ExportModule {}
