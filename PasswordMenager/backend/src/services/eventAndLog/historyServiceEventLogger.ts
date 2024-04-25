import { EventEmitter2 } from '@nestjs/event-emitter';
import { EventAction } from 'src/schemas/Interfaces/event.interface';
import { HistoryEventBuilder } from 'src/schemas/utils/builders/event/historyEvent.builder';
import { LoggerHandler } from 'src/utils/error.handlers';
import { HistoryServiceMessage } from '../history.service';

export class HistoryServiceEventLogger {
  constructor(
    private readonly logHandler: LoggerHandler,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  createEventAndLogger(userid: string, historyResponse): void {
    this.logHandler.handle(
      HistoryServiceMessage.CreateMessage + userid,
      HistoryServiceMessage.Create,
    );
    this.eventEmitter.emitAsync(
      EventAction.Create,
      new HistoryEventBuilder(historyResponse?.id ?? null, historyResponse)
        .setCreateEvent()
        .build(),
    );
  }
}
