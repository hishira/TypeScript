import { AnyKeys, AnyObject, Document, Schema } from 'mongoose';
import { IGroup } from './group.interface';
import { IEntry } from './entry.interface';
import { DTO } from '../dto/object.interface';

export interface IHistory extends Document {
  readonly userid: Schema.Types.ObjectId;
  readonly groups: IGroup[];
  readonly entities: IEntry[];
}

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
    return { $push: { entries: this.entries, groups: this.groups } };
  }

  updateBaseOnIHistory(history: Partial<IHistory>): this {
    const isEntriesDefined = history.entities && history.entities.length > 0;
    const isGroupsDefined = history.groups && history.groups.length > 0;
    isEntriesDefined && this.updateEntries(history.entities);
    isGroupsDefined && this.updateGroups(history.groups);
    return this;
  }
}

export class HistoryDTOMapper {
  static CreateHistoryDTO(userid: string): DTO {
    return new (class implements DTO {
      toObject(): Record<string, unknown> {
        return {
          userid: userid,
          groups: [],
          entities: [],
        };
      }
    })();
  }
}
