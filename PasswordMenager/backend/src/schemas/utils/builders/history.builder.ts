import { AnyKeys, AnyObject } from 'mongoose';
import { IEntry } from 'src/schemas/Interfaces/entry.interface';
import { IGroup } from 'src/schemas/Interfaces/group.interface';
import { IHistory } from 'src/schemas/Interfaces/history.interface';

type PushReturn = AnyKeys<IHistory> & AnyObject;
export class HistoryBuilder {
  constructor(public groups: IGroup[] = [], public entries: IEntry[] = []) {}

  updateGroups(groups: IGroup[]): this {
    this.groups = groups;
    return this;
  }

  updateEntries(entries: IEntry[]): this {
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
}
