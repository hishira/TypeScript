import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { OnEvent } from '@nestjs/event-emitter';
import { CreateHistoryCommand } from 'src/commands/history/CreateHistoryCommand';
import { UpdateHistoryCommand } from 'src/commands/history/UpdateHistoryCommand';
import { EventTypes } from 'src/events/eventTypes';
import { HistoryAppendEvent } from 'src/events/historyAppendEvent';
import { IEntry } from 'src/schemas/Interfaces/entry.interface';
import { IGroup } from 'src/schemas/Interfaces/group.interface';
import { IHistory } from 'src/schemas/Interfaces/history.interface';
import { Logger } from 'src/utils/Logger';
import {
  LogHandler,
  LoggerContext,
  LoggerHandler,
} from 'src/utils/error.handlers';
enum HistoryServiceMessage {
  Create = 'History service; create method',
  CreateMessage = 'History created for user = ',
  UpdateGroupToHistory = 'History service; appendGroupToHistory method',
  UpdateEntietiesToHistory = 'History service; appendEntityToHistory method',
  UpdateGroupMessage = 'Group appended to history with userid = ',
  UpdateEntitiesMessage = 'Entieties appended to history with userid = ',
}

@Injectable()
export class HistoryService implements LoggerContext {
  readonly logHanlder: LoggerHandler = new LogHandler(this);
  constructor(
    private readonly commandBus: CommandBus,
    readonly logger: Logger,
  ) {}

  create(userid: string): Promise<IHistory> {
    return this.commandBus
      .execute(new CreateHistoryCommand(userid))
      .then((historyResponse) => {
        this.logHanlder.handle(
          HistoryServiceMessage.CreateMessage + userid,
          HistoryServiceMessage.Create,
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
    return this.commandBus
      .execute(
        new UpdateHistoryCommand({
          userId: userid,
          entries: entries,
        }),
      )
      .then((updatedHistory) => {
        this.logHanlder.handle(
          HistoryServiceMessage.UpdateEntitiesMessage + userid,
          HistoryServiceMessage.UpdateEntietiesToHistory,
        );
        return updatedHistory;
      });
  }

  appendGroupToHistory(userid: string, groups: IGroup[]): Promise<IHistory> {
    return this.commandBus
      .execute(
        new UpdateHistoryCommand({
          userId: userid,
          groups: groups,
        }),
      )
      .then((updatedHistory) => {
        this.logHanlder.handle(
          HistoryServiceMessage.UpdateGroupMessage + userid,
          HistoryServiceMessage.UpdateGroupToHistory,
        );
        return updatedHistory;
      });
  }
}
