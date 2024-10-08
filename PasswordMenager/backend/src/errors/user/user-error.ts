import mongoose from 'mongoose';
import { BaseError } from '../bace-error';

export class UserError implements BaseError {
  public message: string;
  constructor(readonly error: mongoose.Error) {
    this.message = 'Error occur at user';
  }
}
