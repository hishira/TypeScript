import { Module } from '@nestjs/common';
import { entryProviders } from '../providers/entry.providers';
import { EntryService } from '../services/entry.service';
import { DatabaseModule } from './database.module';
import { EntryContoller } from '../controllers/entry.controller';
@Module({
  imports: [DatabaseModule],
  controllers: [EntryContoller],
  providers: [EntryService, ...entryProviders],
})
export class EntryModule {}
