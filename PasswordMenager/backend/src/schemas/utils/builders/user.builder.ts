import { IUser, UserField } from 'src/schemas/Interfaces/user.interface';
import { PasswordUtils } from 'src/utils/password.utils';

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