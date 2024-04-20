import { Module } from '@nestjs/common';
import { ImportController } from 'src/controllers/import.controller';
import { DatabaseModule } from './database.module';
import { ImportService } from 'src/services/import.service';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { ImportRequestRepository } from 'src/repository/importrequest.repository';
import { importRequestProvider } from 'src/providers/importrequest.provider';
import { CqrsModule } from '@nestjs/cqrs';
import { GetImportQueryHandler } from 'src/handlers/queries/import/getImportsHandler';
import { CreateImportRequestHandler } from 'src/handlers/commands/importRequest/createImportRequestHandler';
import { DeleteImportRequestHandler } from 'src/handlers/commands/importRequest/deleteImportRequestHandler';
import { EditImportRequestHandler } from 'src/handlers/commands/importRequest/editImportRequestHandler';
import { LoggerModule } from './logger.module';

@Module({
  imports: [DatabaseModule, CqrsModule, LoggerModule],
  controllers: [ImportController],
  providers: [
    {
      provide: Repository,
      useClass: ImportRequestRepository,
    },
    ImportService,
    ...importRequestProvider,
    GetImportQueryHandler,
    CreateImportRequestHandler,
    DeleteImportRequestHandler,
    EditImportRequestHandler,
  ],
})
export class ImportModule {}
