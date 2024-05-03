import mongoose from 'mongoose';
import { BaseError } from '../bace-error';

export class GroupError implements BaseError {
  public message: string;
  constructor(readonly error: mongoose.Error) {
    this.message = 'Error occur at group';
  }
}
