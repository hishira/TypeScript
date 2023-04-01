import { IMeta } from './meta.interface';

export interface IUserMeta extends IMeta {
  readonly lastLogin: string;
  readonly lastPassword: string;
}
