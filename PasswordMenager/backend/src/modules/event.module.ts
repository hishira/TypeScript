import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateEventHandler } from 'src/handlers/commands/event/createEventHandler';
import { eventProvider } from 'src/providers/event.provider';
import { EventRepository } from 'src/repository/event.repository';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { EventService } from 'src/services/event.service';
import { DatabaseModule } from './database.module';
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
    EventService,
  ],
})
export class EventModule {}
