import { Types } from 'mongoose';
import { IUser } from 'src/schemas/Interfaces/user.interface';
import { AuthInfo } from 'src/schemas/dto/auth.dto';
import { EditUserDto } from 'src/schemas/dto/edituser.dto';
import { CreateUserDto } from 'src/schemas/dto/user.dto';
import { TestDataUtils } from '../../test/utils/TestDataUtils';

export const userMock = (user?: IUser) =>
  user ??
  ({
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
  } as unknown as IUser);

export const CreateUserDtoMock = (): CreateUserDto => ({
  login: 'example_login_test',
  password: 'example_login_test',
  email: '',
});

export const EditUserDtoMock = (): EditUserDto => ({
  login: 'example_edited_login',
  password: 'example_edited_password',
});

export const AuthInfoMock = (): IUser =>
  ({
    login: 'example',
    password: 'example',
  } as unknown as IUser);
export const UserRequestMock = () => ({
  user: {
    login: 'example',
    _id: TestDataUtils.getRandomObjectIdAsString(),
  },
});
export class UserModelMock {
  constructor(private data) {}

  save() {
    return Promise.resolve({ _id: new Types.ObjectId(32), ...this.data });
  }

  static exec = jest.fn();

  static find(option) {
    return {
      exec: () => Promise.resolve([userMock()]),
    };
  }

  static findOne(option) {
    return {
      exec: () => Promise.resolve(userMock()),
    };
  }

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

  static findById(id: string): Promise<IUser> {
    return Promise.resolve(userMock());
  }

  static updateOne(filterOption, objectOption) {
    return Promise.resolve(userMock());
  }

  // TODO: Check and can be better implement this mock
  static findOneAndUpdate(option, newentry: { $set }) {
    return Promise.resolve(userMock());
  }
}
