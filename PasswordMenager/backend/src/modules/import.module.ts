import { Module } from '@nestjs/common';
import { ImportController } from 'src/controllers/import.controller';
import { DatabaseModule } from './database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ImportController],
})
export class ImportModule {}
