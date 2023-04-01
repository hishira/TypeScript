import { Document } from 'mongoose';

export interface IMeta extends Document {
  readonly crateDate: Date;
  readonly firstEditDate: Date;
  readonly editDate: Date;
}
