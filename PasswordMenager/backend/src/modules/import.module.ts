import { Module } from '@nestjs/common';
import { ImportController } from 'src/controllers/import.controller';
import { DatabaseModule } from './database.module';
import { ImportService } from 'src/services/import.service';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { ImportRequestRepository } from 'src/repository/importrequest.repository';
import { importRequestProvider } from 'src/providers/importrequest.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [ImportController],
  providers: [
    {
      provide: Repository,
      useClass: ImportRequestRepository,
    },
    ImportService,
    ...importRequestProvider,
  ],
})
export class ImportModule {}
