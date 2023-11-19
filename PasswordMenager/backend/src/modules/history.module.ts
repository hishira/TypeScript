import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateHisotryHandler } from 'src/handlers/commands/history/createHistoryHandler';
import { historyProvider } from 'src/providers/history.provider';
import { HistoryRepository } from 'src/repository/history.repository';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { HistoryService } from 'src/services/history.service';
import { DatabaseModule } from './database.module';
import { UpdateHistoryHandler } from 'src/handlers/commands/history/updateHistoryHandler';

@Module({
  imports: [DatabaseModule, CqrsModule],
  providers: [
    {
      provide: Repository,
      useClass: HistoryRepository,
    },
    HistoryService,
    ...historyProvider,
    CreateHisotryHandler,
    UpdateHistoryHandler,
  ],
  exports: [HistoryService],
})
export class HistoryModule {}
