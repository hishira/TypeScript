import { Document, Schema } from 'mongoose';
import { Paginator } from 'src/utils/paginator';
import { IEntryMeta } from './entryMeta.interface';
export enum EntryState {
  ACTIVE = 'active',
  DELETED = 'deleted',
  SUSPENDED = 'suspended',
}
export interface IEntry extends Document {
  readonly _id: string;
  readonly title: string;
  readonly username: string;
  password: string;
  readonly note: string;
  readonly url: string;
  readonly groupid: Schema.Types.ObjectId | string;
  readonly userid: Schema.Types.ObjectId;
  readonly email: string;
  readonly passwordExpiredDate?: Date | string;
  readonly meta: IEntryMeta;
  readonly state: EntryState;
}

export type EntryData = {
  data: IEntry[];
  pageInfo: Paginator;
};
