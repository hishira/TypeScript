import { Module } from '@nestjs/common';
import { EntryRepository } from 'src/repository/entry.repository';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { GroupExistsValidator } from 'src/validators/CheckGroup.validator';
import { ValidatorModule } from 'src/validators/validator.module';
import { EntryContoller } from '../controllers/entry.controller';
import { entryProviders } from '../providers/entry.providers';
import { EntryService } from '../services/entry.service';
import { DatabaseModule } from './database.module';
import { GroupExtModule } from './group-ext.module';
@Module({
  imports: [DatabaseModule, GroupExtModule, ValidatorModule],
  controllers: [EntryContoller],
  providers: [
    {
      provide: Repository,
      useClass: EntryRepository,
    },
    EntryService,
    ...entryProviders,
    GroupExistsValidator,
  ],
})
export class EntryModule {}
