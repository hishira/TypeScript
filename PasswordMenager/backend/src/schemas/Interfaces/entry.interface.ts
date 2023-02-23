import { Document } from 'mongoose';

export interface IEntry extends Document {
  readonly _id: string;
  readonly title: string;
  readonly username: string;
  password: string;
  readonly note: string;
  readonly groupid: string;
  readonly userid: string;
}
