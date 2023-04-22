import { Types } from 'mongoose';
import { IUser } from 'src/schemas/Interfaces/user.interface';

export const userMock = (user?: IUser) =>
  user ?? {
    _id: new Types.ObjectId(32),
    login: 'test_login',
    password: 'testpassword',
    meta: {
      crateDate: Date.now(),
      firstEditDate: Date.now(),
      editDate: Date.now(),
      lastLogin: 'test_last_login',
      lastPassword: 'test_last_password',
    },
    validatePassword: (_password) => Promise.resolve(true),
  };

export class UserModelMock {
  constructor(private data) {}

  save() {
    return this.data;
  }

  static exec = jest.fn();
  static find(option) {
    return {
      exec: () => Promise.resolve(userMock()),
    };
  }
  static findOne(option) {
    return {
      exec: () => Promise.resolve(userMock()),
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
  static findById(id: string) {
    return {
      exec: () => Promise.resolve(userMock()),
    };
  }
  static updateOne(filterOption, objectOption) {
    return Promise.resolve(userMock());
  }
}
