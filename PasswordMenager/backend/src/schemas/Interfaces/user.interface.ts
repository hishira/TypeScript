import { Document } from 'mongoose';
import { IMeta } from 'src/schemas/Interfaces/meta.interface';
export interface IUser extends Document {
  readonly login: string;
  readonly password: string;
  readonly meta: IMeta;
  validatePassword(password: string): Promise<boolean>;
}
