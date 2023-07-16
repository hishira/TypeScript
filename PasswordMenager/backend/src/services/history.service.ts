import { Inject, Injectable } from '@nestjs/common';
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

  appendEntityToHistory(userid: string, entry: IEntry): Promise<unknown> {
    return this.historyRepository.update({
      userid: userid as unknown as ObjectId,
      entities: [entry],
    });
  }

  appendGroupToHistory(userid: string, group: IGroup): Promise<unknown> {
    return this.historyRepository.update({
      userid: userid as unknown as ObjectId,
      groups: [group],
    });
  }
}
