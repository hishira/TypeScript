import { Document } from 'mongoose';
import { IUserMeta } from './userMeta.interface';
export enum UserField {
  LOGIN = 'login',
  PASSWORD = 'password',
}
export enum MetaAttributeUser {
  LASTPASSWORD = 'meta.lastPassword',
  LASTLOGIN = 'meta.lastLogin',
  EDITDATE = 'meta.editDate',
}
export interface IUser extends Document {
  readonly login: string;
  readonly password: string;
  readonly email: string;
  readonly meta: IUserMeta;
  readonly _password?: string;
  readonly defaultPasswordForEntries: string;
  validatePassword(password: string): Promise<boolean>;
}
