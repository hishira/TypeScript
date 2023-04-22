import { Model, Types } from 'mongoose';
import { IEntry } from 'src/schemas/Interfaces/entry.interface';
export const entryMock = (entry?: IEntry) =>
  entry ?? {
    _id: new Types.ObjectId(32), //ObjectId(32),
    title: 'test title',
    userid: 'asd123cxz',
    username: 'test username',
    password: 'dupa123',
    note: 'dupa',
    groupid: new Types.ObjectId(32),
    passwordExpiredDate: Date.now(),
    meta: {
      crateDate: Date.now(),
      firstEditDate: Date.now(),
      editDate: Date.now(),
      lastNote: null,
      lastPassword: null,
      lastTitle: null,
      lastUsername: null,
      lastEditedVariable: null,
    },
  };
export class EntryMockModel {
  constructor(private data) {}
  save() {
    return Promise.resolve(this.data);
  } //= jest.fn().mockResolvedValue(Promise.resolve(this.data));
  static exec = jest.fn();
  static find = jest.fn().mockResolvedValue({});
  static findOne = jest.fn().mockResolvedValue({});
  static findOneAndUpdate = jest.fn().mockResolvedValue({});
  static deleteOne = jest.fn().mockResolvedValue(true);
  static deleteMany = jest.fn().mockRejectedValue(Promise.resolve(true));
  static findByIdAndDelete(id: string) {
    return {
      exec: () => Promise.resolve(true),
    };
  }
  static findById(id: string) {
    return {
      exec: () => Promise.resolve(entryMock()),
    };
  }
  static updateOne(filterOption, objectOption) {
    return Promise.resolve(entryMock());
  }

  static getValues = () => ({
    new: (val) => val, //jest.fn().mockResolvedValue(entryMock()),
    constructor: (val) => val, //jest.fn().mockResolvedValue(entryMock()),
    exec: jest.fn(),
    find: jest.fn().mockResolvedValue({}),
    findOne: jest.fn().mockResolvedValue({}),
    findOneAndUpdate: jest.fn().mockResolvedValue({}),
    deleteOne: jest.fn().mockResolvedValue(true),
  });
}
