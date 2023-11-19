import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { OnEvent } from '@nestjs/event-emitter';
import { CreateHistoryCommand } from 'src/commands/history/CreateHistoryCommand';
import { UpdateHistoryCommand } from 'src/commands/history/UpdateHistoryCommand';
import { IEntry } from 'src/schemas/Interfaces/entry.interface';
import { IGroup } from 'src/schemas/Interfaces/group.interface';
import { IHistory } from 'src/schemas/Interfaces/history.interface';

@Injectable()
export class HistoryService {
  constructor(private readonly commandBus: CommandBus) {}

  create(userid: string): Promise<IHistory> {
    return this.commandBus.execute(new CreateHistoryCommand(userid));
  }

  @OnEvent('history.append', { async: true })
  eventHistoryUpdate(payload: {
    userid: string;
    entries: IEntry[] | IGroup[];
    historyAddType: 'entry' | 'group';
  }) {
    return payload.historyAddType === 'entry'
      ? this.appendEntityToHistory(payload.userid, payload.entries as IEntry[])
      : this.appendGroupToHistory(payload.userid, payload.entries as IGroup[]);
  }

  appendEntityToHistory(userid: string, entries: IEntry[]): Promise<unknown> {
    return this.commandBus.execute(
      new UpdateHistoryCommand({
        userId: userid,
        entries: entries,
      }),
    );
  }

  appendGroupToHistory(userid: string, groups: IGroup[]): Promise<unknown> {
    return this.commandBus.execute(
      new UpdateHistoryCommand({
        userId: userid,
        groups: groups,
      }),
    );
  }
}
