import { ObjectId } from 'mongoose';
import { IEntry } from 'src/schemas/Interfaces/entry.interface';
import { IGroup } from 'src/schemas/Interfaces/group.interface';

export class HistoryAppendEvent {
  useridString: string;
  constructor(
    readonly userid: string | ObjectId,
    readonly objects: IEntry[] | IGroup[],
    readonly historyAddType: 'entry' | 'group',
  ) {
    this.useridString = this.userid as string;
  }
}
