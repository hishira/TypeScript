import { Document, Schema } from 'mongoose';
import { IEntryMeta } from './entryMeta.interface';
import { Paginator } from 'src/utils/paginator';

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
  readonly passwordExpiredDate?: Date;
  readonly meta: IEntryMeta;
}

export type EntryData = {
  data: IEntry[];
  pageInfo: Paginator;
};
