import { Module } from '@nestjs/common';
import { EntryRepository } from 'src/repository/entry.repository';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { EntryContoller } from '../controllers/entry.controller';
import { entryProviders } from '../providers/entry.providers';
import { EntryService } from '../services/entry.service';
import { DatabaseModule } from './database.module';
@Module({
  imports: [DatabaseModule],
  controllers: [EntryContoller],
  providers: [
    {
      provide: Repository,
      useClass: EntryRepository,
    },
    EntryService,
    ...entryProviders,
  ],
})
export class EntryModule {}
