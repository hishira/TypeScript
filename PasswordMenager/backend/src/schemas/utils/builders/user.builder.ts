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
      ...this.userMeta,
      defaultPasswordForEntries: importPasswordEntries,
    };

    return this;
  }

  emailUpdate(email: string): this {
    this.user = {
      ...this.user,
      ...this.userMeta,
      email,
    };

    return this;
  }

  async passwordUpdate(password: string): Promise<this> {
    const hashesPassword = await PasswordUtils.EncryptPassword(password);
    this.user = {
      ...this.userMeta,
      password: hashesPassword,
    } as unknown as Partial<IUser>;

    return this;
  }

  async updateBasedOnUserEntry(user: Partial<IUser>): Promise<this> {
    if (UserField.PASSWORD in user) {
      await this.updatePassword(user.password);
    }
    if ('login' in user) {
      this.loginUpdate(user.login);
    }
    if ('email' in user) {
      this.emailUpdate(user.email);
    }
    if ('defaultPasswordForEntries' in user) {
      this.passwordForImportEntries(user.defaultPasswordForEntries);
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
