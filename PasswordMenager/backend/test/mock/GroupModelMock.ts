import { Types } from 'mongoose';
import { DeleteOption } from 'src/schemas/Interfaces/deleteoption.interface';
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
  constructor(private data: IGroup) {}

  save(): Promise<IGroup> {
    return Promise.resolve(this.data);
  }

  static exec = jest.fn();
  static find(option): { exec: () => Promise<IGroup[]> } {
    return {
      exec: (): Promise<IGroup[]> => Promise.resolve([groupMock()]),
    };
  }
  static findOne(option): { exec: () => Promise<IGroup> } {
    return {
      exec: (): Promise<IGroup> => Promise.resolve(groupMock()),
    };
  }
  static findOneAndUpdate = jest.fn().mockResolvedValue({});
  static deleteOne(options): { exec: () => Promise<true> } {
    return {
      exec: (): Promise<true> => Promise.resolve(true),
    };
  }
  static deleteMany = jest.fn().mockRejectedValue(Promise.resolve(true));
  static findByIdAndDelete(id: string): { exec: () => Promise<true> } {
    return {
      exec: (): Promise<true> => Promise.resolve(true),
    };
  }

  static findOneAndDelete(option: DeleteOption<IGroup>): {
    exec: () => Promise<IGroup>;
  } {
    return { exec: (): Promise<IGroup> => Promise.resolve(groupMock()) };
  }
  static findByIdAndUpdate(...args: any[]): Promise<IGroup> {
    return Promise.resolve(groupMock());
  }
  static findById(id: string): Promise<IGroup> {
    return Promise.resolve(groupMock());
  }
  static updateOne(filterOption, objectOption): Promise<IGroup> {
    return Promise.resolve(groupMock());
  }
}
