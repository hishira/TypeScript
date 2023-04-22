import { Document } from 'mongoose';
import { IEntryMeta } from './entryMeta.interface';

export interface IEntry extends Document {
  readonly _id: string;
  readonly title: string;
  readonly username: string;
  password: string;
  readonly note: string;
  readonly groupid: string;
  readonly userid: string;
  readonly passwordExpiredDate?: Date;
  readonly meta: IEntryMeta;
}
