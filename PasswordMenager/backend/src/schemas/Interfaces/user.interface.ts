import { Document } from 'mongoose';
import { IUserMeta } from './userMeta.interface';
export interface IUser extends Document {
  readonly login: string;
  readonly password: string;
  readonly meta: IUserMeta;
  validatePassword(password: string): Promise<boolean>;
}
