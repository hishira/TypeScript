import { Document, Schema } from 'mongoose';
import { IGroup } from './group.interface';
import { IEntry } from './entry.interface';

export interface IHistory extends Document {
  readonly userid: Schema.Types.ObjectId;
  readonly groups: IGroup[];
  readonly entities: IEntry[];
}
