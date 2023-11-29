import { Document, Schema } from 'mongoose';
import { IEntry } from './entry.interface';
import { IGroup } from './group.interface';

export interface IHistory extends Document {
  readonly userid: Schema.Types.ObjectId;
  readonly groups: IGroup[];
  readonly entities: IEntry[];
}
