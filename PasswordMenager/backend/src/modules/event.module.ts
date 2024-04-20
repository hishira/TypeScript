import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateEventHandler } from 'src/handlers/commands/event/createEventHandler';
import { EventRepository } from 'src/repository/event.repository';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { DatabaseModule } from './database.module';
import { eventProvider } from 'src/providers/event.provider';
import { LoggerModule } from './logger.module';

@Module({
  imports: [DatabaseModule, CqrsModule, LoggerModule],
  providers: [
    ...eventProvider,
    {
      provide: Repository,
      useClass: EventRepository,
    },
    CreateEventHandler,
  ],
})
export class EventModule {}
