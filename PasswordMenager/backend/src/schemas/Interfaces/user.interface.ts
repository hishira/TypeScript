import { Document } from 'mongoose';
import { IUserMeta } from './userMeta.interface';
export interface IUser extends Document {
  readonly login: string;
  readonly password: string;
  readonly email: string;
  readonly meta: IUserMeta;
  readonly _password?: string;
  validatePassword(password: string): Promise<boolean>;
}
