import { Document } from 'mongoose';
export interface IUser extends Document {
  readonly login: string;
  readonly password: string;
  validatePassword(password: string): Promise<boolean>;
}
