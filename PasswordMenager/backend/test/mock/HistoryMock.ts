import { Types } from 'mongoose';
import { IHistory } from 'src/schemas/Interfaces/history.interface';
import { entryMock } from './EntryMock';
import { groupMock } from './GroupModelMock';

export const historyMock = (history?: IHistory): IHistory =>
  history ??
  ({
    _id: new Types.ObjectId(32),
    userid: new Types.ObjectId(32),
    groups: [groupMock(), groupMock()],
    entities: [entryMock(), entryMock()],
  } as unknown as IHistory);

export class HistoryMockData {
  constructor(private data: IHistory = historyMock()) {}

  save(): Promise<IHistory> {
    return Promise.resolve(this.data);
  }

  static updateOne(option) {
    return {
      exec: () => Promise.resolve(historyMock()),
    };
  }

  static findOneAndUpdate(find, setters, options): Promise<IHistory> {
    return Promise.resolve(historyMock());
  }
}
