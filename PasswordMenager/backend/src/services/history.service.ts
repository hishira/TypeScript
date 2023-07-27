import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ObjectId } from 'mongoose';
import { IEntry } from 'src/schemas/Interfaces/entry.interface';
import { IGroup } from 'src/schemas/Interfaces/group.interface';
import { IHistory } from 'src/schemas/Interfaces/history.interface';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { DTO } from 'src/schemas/dto/object.interface';

@Injectable()
export class HistoryService {
  constructor(
    @Inject(Repository)
    private readonly historyRepository: Repository<IHistory>,
  ) {}

  create(userid: string): Promise<IHistory> {
    // AnonymousClass
    return this.historyRepository.create(
      new (class implements DTO {
        toObject(): Record<string, unknown> {
          return {
            userid: userid,
            groups: [],
            entities: [],
          };
        }
      })(),
    );
  }

  @OnEvent('history.append', { async: true })
  eventHistoryUpdate(payload: { userid: string; entries: IEntry[] }) {
    return this.appendEntityToHistory(payload.userid, payload.entries);
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
