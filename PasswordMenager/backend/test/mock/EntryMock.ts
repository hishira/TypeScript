import { Model } from 'mongoose';
import { IEntry } from 'src/schemas/Interfaces/entry.interface';

export class EntryMockModel {
  private test;
  constructor(private tt) {
    this.test = tt;
  }
  save = jest.fn().mockResolvedValue({});
  static exec = jest.fn();
  static find = jest.fn().mockResolvedValue({});
  static findOne = jest.fn().mockResolvedValue({});
  static findOneAndUpdate = jest.fn().mockResolvedValue({});
  static deleteOne = jest.fn().mockResolvedValue(true);
}
