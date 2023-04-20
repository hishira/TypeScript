import { Types } from 'mongoose';
import { IGroup } from 'src/schemas/Interfaces/group.interface';

export const groupMock = (group?: IGroup) =>
  group ?? {
    _id: new Types.ObjectId(32),
    name: 'group example name',
    userid: new Types.ObjectId(32),
    meta: {
      crateDate: Date.now(),
      firstEditDate: Date.now(),
      editDate: Date.now(),
      lastName: null,
    },
  };

export class GroupModelMock {
  constructor(private data) {}
  save() {
    return this.data;
  }

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
      exec: () => Promise.resolve(groupMock()),
    };
  }
  static updateOne(filterOption, objectOption) {
    return Promise.resolve(groupMock());
  }
}
