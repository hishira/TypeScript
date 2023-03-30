import { Document } from 'mongoose';
export interface IUser extends Document {
  readonly login: string;
  readonly password: string;
  readonly meta: string;
  validatePassword(password: string): Promise<boolean>;
}
