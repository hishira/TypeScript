import { AnyKeys, AnyObject, ObjectId } from 'mongoose';
import { IEntry } from 'src/schemas/Interfaces/entry.interface';
import { IGroup } from 'src/schemas/Interfaces/group.interface';
import { IHistory } from 'src/schemas/Interfaces/history.interface';
import { isDefined } from 'src/utils/utils';

type PushReturn = AnyKeys<IHistory> & AnyObject;
export class HistoryBuilder {
  constructor(
    private groups: IGroup[] = [],
    private entries: IEntry[] = [],
    private userId: string = null,
  ) {}

  updateUserId(userId?: string): this {
    if (!isDefined(userId)) return this;
    this.userId = userId;
    return this;
  }
  updateGroups(groups?: IGroup[]): this {
    if (!isDefined(groups)) return this;
    this.groups = groups;
    return this;
  }

  updateEntries(entries?: IEntry[]): this {
    if (!isDefined(entries)) return this;
    this.entries = entries;
    return this;
  }
  getPushObject(): PushReturn {
    return { $push: { entities: this.entries, groups: this.groups } };
  }

  updateBaseOnIHistory(history: Partial<IHistory>): this {
    const isEntriesDefined = history.entities && history.entities.length > 0;
    const isGroupsDefined = history.groups && history.groups.length > 0;
    isEntriesDefined && this.updateEntries(history.entities);
    isGroupsDefined && this.updateGroups(history.groups);
    return this;
  }

  getPartialHistory(): Partial<IHistory> {
    if (this.userId === null)
      throw new Error('User id in history builder is not pass');

    return {
      userid: this.userId as unknown as ObjectId,
      ...(isDefined(this.entries) &&
        this.entries.length > 0 && { entities: this.entries }),
      ...(isDefined(this.groups) &&
        this.groups.length > 0 && { groups: this.groups }),
    };
  }
}
