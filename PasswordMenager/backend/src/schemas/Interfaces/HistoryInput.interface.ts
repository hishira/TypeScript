import { IEntry } from './entry.interface';
import { IGroup } from './group.interface';

export interface HistoryInput {
  userId: string;
  entries?: IEntry[];
  groups?: IGroup[];
}
