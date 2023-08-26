import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ObjectId } from 'mongoose';
import { IEntry } from 'src/schemas/Interfaces/entry.interface';
import { IGroup } from 'src/schemas/Interfaces/group.interface';
import {
  HistoryDTOMapper,
  IHistory,
} from 'src/schemas/Interfaces/history.interface';
import { Repository } from 'src/schemas/Interfaces/repository.interface';

@Injectable()
export class HistoryService {
  constructor(
    @Inject(Repository)
    private readonly historyRepository: Repository<IHistory>,
  ) {}

  create(userid: string): Promise<IHistory> {
    return this.historyRepository.create(
      HistoryDTOMapper.CreateHistoryDTO(userid),
    );
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
    return this.historyRepository.update({
      userid: userid as unknown as ObjectId,
      entities: [...entries],
    });
  }

  appendGroupToHistory(userid: string, groups: IGroup[]): Promise<unknown> {
    return this.historyRepository.update({
      userid: userid as unknown as ObjectId,
      groups: [...groups],
    });
  }
}
