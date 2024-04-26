import { EventEmitter2 } from '@nestjs/event-emitter';
import { UpdateHistoryCommand } from 'src/commands/history/UpdateHistoryCommand';
import { EventAction } from 'src/schemas/Interfaces/event.interface';
import { HistoryEventBuilder } from 'src/schemas/utils/builders/event/historyEvent.builder';
import { LoggerHandler } from 'src/utils/error.handlers';
import { HistoryServiceMessage } from 'src/errors/errors-messages/historyErrorMessages';

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

  historyEntityAppendEventAndLog(historyCommand: UpdateHistoryCommand): void {
    this.logHandler.handle(
      HistoryServiceMessage.UpdateEntitiesMessage + historyCommand.input.userId,
      HistoryServiceMessage.UpdateEntietiesToHistory,
    );

    this.eventEmitter.emitAsync(
      EventAction.Create,
      new HistoryEventBuilder(null, historyCommand)
        .setEntityHistoryAppendEvent()
        .build(),
    );
  }

  historyGroupAppendEventAndLog(historyCommand: UpdateHistoryCommand): void {
    this.logHandler.handle(
      HistoryServiceMessage.UpdateEntitiesMessage + historyCommand.input.userId,
      HistoryServiceMessage.UpdateEntietiesToHistory,
    );

    this.eventEmitter.emitAsync(
      EventAction.Create,
      new HistoryEventBuilder(null, historyCommand)
        .setGroupHistoryAppendEvent()
        .build(),
    );
  }
}
