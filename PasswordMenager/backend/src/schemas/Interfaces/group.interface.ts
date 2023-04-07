import { Document } from 'mongoose';
import { IGroupMeta } from './groupMeta.interface';

export interface IGroup extends Document {
  readonly name: string;
  readonly userid: string;
  readonly meta: IGroupMeta;
}
