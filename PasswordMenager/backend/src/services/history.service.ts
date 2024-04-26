import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { CreateHistoryCommand } from 'src/commands/history/CreateHistoryCommand';
import { UpdateHistoryCommand } from 'src/commands/history/UpdateHistoryCommand';
import { EventTypes } from 'src/events/eventTypes';
import { HistoryAppendEvent } from 'src/events/historyAppendEvent';
import { IEntry } from 'src/schemas/Interfaces/entry.interface';
import { IGroup } from 'src/schemas/Interfaces/group.interface';
import { IHistory } from 'src/schemas/Interfaces/history.interface';
import { Logger } from 'src/utils/Logger';
import { LogHandler, LoggerContext } from 'src/utils/error.handlers';
import { HistoryServiceEventLogger } from './eventAndLog/historyServiceEventLogger';
@Injectable()
export class HistoryService implements LoggerContext {
  private historyServiceEventLogger: HistoryServiceEventLogger;
  constructor(
    private readonly commandBus: CommandBus,
    private readonly eventEmitter: EventEmitter2,
    readonly logger: Logger,
  ) {
    this.historyServiceEventLogger = new HistoryServiceEventLogger(
      new LogHandler(this),
      this.eventEmitter,
    );
  }

  create(userid: string): Promise<IHistory> {
    return this.commandBus
      .execute(new CreateHistoryCommand(userid))
      .then((historyResponse) => {
        this.historyServiceEventLogger.createEventAndLogger(
          userid,
          historyResponse,
        );
        return historyResponse;
      });
  }

  @OnEvent(EventTypes.HistoryAppend, { async: true })
  eventHistoryUpdate(payload: HistoryAppendEvent): Promise<unknown> {
    return payload.historyAddType === 'entry'
      ? this.appendEntityToHistory(
          payload.useridString,
          payload.objects as IEntry[],
        )
      : this.appendGroupToHistory(
          payload.useridString,
          payload.objects as IGroup[],
        );
  }

  appendEntityToHistory(userid: string, entries: IEntry[]): Promise<IHistory> {
    const updateHistoryCommand = new UpdateHistoryCommand({
      userId: userid,
      entries: entries,
    });
    return this.commandBus
      .execute(updateHistoryCommand)
      .then((updatedHistory) => {
        this.historyServiceEventLogger.historyEntityAppendEventAndLog(
          updateHistoryCommand,
        );
        return updatedHistory;
      });
  }

  appendGroupToHistory(userid: string, groups: IGroup[]): Promise<IHistory> {
    const updateHistoryCommand = new UpdateHistoryCommand({
      userId: userid,
      groups: groups,
    });
    return this.commandBus
      .execute(updateHistoryCommand)
      .then((updatedHistory) => {
        this.historyServiceEventLogger.historyGroupAppendEventAndLog(
          updateHistoryCommand,
        );
        return updatedHistory;
      });
  }
}
