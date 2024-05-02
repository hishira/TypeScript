import mongoose from 'mongoose';
import { BaseError } from '../bace-error';

export class UserError implements BaseError {
  public message;
  constructor(private readonlyerror: mongoose.Error) {
    this.message = 'Error occur at user';
  }
}
