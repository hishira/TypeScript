import { Types } from 'mongoose';
import { IGroup } from 'src/schemas/Interfaces/group.interface';
import { CreateGroupDto } from 'src/schemas/dto/group.dto';

const id = new Types.ObjectId(32);
const userid = new Types.ObjectId(32);
const DATENOW = Date.now();
const meta = {
  crateDate: DATENOW,
  firstEditDate: DATENOW,
  editDate: DATENOW,
  lastName: null,
};
export const groupMock = (group?: IGroup): IGroup =>
  group ??
  ({
    _id: id,
    name: 'group example name',
    userid,
    meta,
  } as unknown as IGroup);

export const CreateGroupDtoMock = (): CreateGroupDto => ({
  name: 'Test group example',
});
export class GroupModelMock {
  constructor(private data) {}

  save() {
    return Promise.resolve(this.data);
  }

  static exec = jest.fn();
  static find(option) {
    return {
      exec: () => Promise.resolve([groupMock()]),
    };
  }
  static findOne(option) {
    return {
      exec: () => Promise.resolve(groupMock()),
    };
  }
  static findOneAndUpdate = jest.fn().mockResolvedValue({});
  static deleteOne(options) {
    return {
      exec: () => Promise.resolve(true),
    };
  }
  static deleteMany = jest.fn().mockRejectedValue(Promise.resolve(true));
  static findByIdAndDelete(id: string) {
    return {
      exec: () => Promise.resolve(true),
    };
  }

  static findByIdAndUpdate(...args: any[]) {
    return Promise.resolve(groupMock());
  }
  static findById(id: string) {
    // return {
    //   exec: () => Promise.resolve(groupMock()),
    // }
    return Promise.resolve(groupMock());
  }
  static updateOne(filterOption, objectOption) {
    return Promise.resolve(groupMock());
  }
}
