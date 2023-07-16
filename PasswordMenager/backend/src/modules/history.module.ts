import { Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { historyProvider } from 'src/providers/history.provider';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { HistoryRepository } from 'src/repository/history.repository';
import { HistoryService } from 'src/services/history.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: Repository,
      useClass: HistoryRepository,
    },
    HistoryService,
    ...historyProvider,
  ],
  exports: [HistoryService],
})
export class HistoryModule {}
