import { Module } from '@nestjs/common';
import { ImportController } from 'src/controllers/import.controller';
import { DatabaseModule } from './database.module';
import { ImportService } from 'src/services/import.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ImportController],
  providers: [ImportService],
})
export class ImportModule {}
