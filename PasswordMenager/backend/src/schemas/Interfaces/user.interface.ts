import { Document, FilterQuery } from 'mongoose';
import { IUserMeta } from './userMeta.interface';
import { PasswordUtils } from 'src/utils/password.utils';
import { FilterOption } from './filteroption.interface';
import { DTO } from '../dto/object.interface';
import { CreateUserDto } from '../dto/user.dto';
export enum UserField {
  LOGIN = 'login',
  PASSWORD = 'password',
}
export enum MetaAttributeUser {
  LASTPASSWORD = 'meta.lastPassword',
  LASTLOGIN = 'meta.lastLogin',
  EDITDATE = 'meta.editDate',
}
export interface IUser extends Document {
  readonly login: string;
  readonly password: string;
  readonly email: string;
  readonly meta: IUserMeta;
  readonly _password?: string;
  readonly defaultPasswordForEntries: string;
  validatePassword(password: string): Promise<boolean>;
}

export class UserBuilder {
  constructor(public user: Partial<IUser> = {}, public userMeta = {}) {}

  async updatePassword(password: string): Promise<this> {
    const hashesPassword = await PasswordUtils.EncryptPassword(password);
    this.user = {
      ...this.userMeta,
      password: hashesPassword,
    };
    return this;
  }

  loginUpdate(login: string): this {
    this.user = {
      ...this.userMeta,
      login: login,
    };
    return this;
  }

  passwordForImportEntries(importPasswordEntries): this {
    this.user = {
      ...this.user,
      defaultPasswordForEntries: importPasswordEntries,
    };

    return this;
  }

  async updateBasedOnUserEntry(user: Partial<IUser>): Promise<this> {
    if (UserField.PASSWORD in user) {
      const hashesPassword = await PasswordUtils.EncryptPassword(user.password);
      this.user = {
        ...this.userMeta,
        password: hashesPassword,
      } as unknown as Partial<IUser>;
    } else {
      this.user = {
        ...this.userMeta,
        login: user.login,
      } as unknown as Partial<IUser>;
    }
    return this;
  }

  updateMetaObject(meta): this {
    this.userMeta = meta;
    this.user = {
      ...this.user,
      ...meta,
    };
    return this;
  }

  getUser(): Partial<IUser> {
    return this.user;
  }

  getMetaObject() {
    return this.userMeta;
  }
  getUserAsPromise(): Promise<Partial<IUser>> {
    return Promise.resolve(this.user);
  }
}

export class UserMetaBuilder {
  constructor(
    private lastValue: string = '',
    private filedsToUpdate: MetaAttributeUser = MetaAttributeUser.LASTPASSWORD,
  ) {}

  updateLastValues(lastValue: string): this {
    this.lastValue = lastValue;
    return this;
  }

  updateFieldsToUpdate(fieldsToUpdate: MetaAttributeUser): this {
    this.filedsToUpdate = fieldsToUpdate;
    return this;
  }

  updateFieldToUpdatedBaseOnEditedDto(entryToEdit: Partial<IUser>): this {
    const filedToUpdate: MetaAttributeUser = entryToEdit.password
      ? MetaAttributeUser.LASTPASSWORD
      : MetaAttributeUser.LASTLOGIN;
    this.filedsToUpdate = filedToUpdate;
    return this;
  }

  getMetaObject() {
    return {
      [MetaAttributeUser.EDITDATE]: Date.now(),
      [this.filedsToUpdate]: this.lastValue,
    };
  }
}

export const ErrorUserCreateResponse = {
  message: 'Problem occur while user create',
};
export class UserDTOMapper {
  static GetDTOFromCreateUserDTO(userCreateDTO: CreateUserDto): DTO {
    return {
      toObject: () => ({ ...userCreateDTO }),
    };
  }
}
export class UserUtils {
  static get allUserFilterOption(): FilterOption<FilterQuery<IUser>> {
    return {
      getOption() {
        return {};
      },
    };
  }

  static GetFirstUserFromTableOrNull(users: IUser[]): IUser | null {
    return users && users.length ? users[0] : null;
  }
}
