import { ObjectId } from 'mongoose';
import { EntryState, IEntry } from 'src/schemas/Interfaces/entry.interface';
import { LastEditedVariable } from 'src/schemas/Interfaces/entryMeta.interface';
import { EntrySchemaUtils, algorithm } from '../Entry.schema.utils';
import { Cipher } from 'src/utils/cipher.utils';

export class EntryBuilder {
  constructor(private entry: Partial<IEntry> = {}) {}

  public getEntry(): Partial<IEntry> {
    return this.entry;
  }

  public entryNoteUpdate(note: string): this {
    this.entry = {
      ...this.entry,
      ['meta.lastNote']: note,
      ['meta.lastEditedVariable']: LastEditedVariable.LASTNOTE,
    } as unknown as Partial<IEntry>;

    return this;
  }

  public updateEntryId(id: string): this {
    this.entry = {
      ...this.entry,
      _id: id,
    };
    return this;
  }

  public updatePasswordWithoutHashing(password: string): this {
    this.entry = {
      ...this.entry,
      password: password,
    };
    return this;
  }

  public updatePasswordExpireDate(passowordExpireDate: Date): this {
    this.entry = {
      ...this.entry,
      passwordExpiredDate: passowordExpireDate,
    };
    return this;
  }

  public updateUrl(newUrl: string): this {
    this.entry = {
      ...this.entry,
      url: newUrl,
    };

    return this;
  }

  public entryPasswordUpdate(
    userid: string | ObjectId,
    lastPassword: string,
    data,
  ): this {
    const bs = EntrySchemaUtils.generateKeyValue(userid);
    const { password, ...rest } = data;
    data = {
      ...rest,
      password: new Cipher(algorithm, bs, process.env.iv).encryptValue(
        password,
      ),
    };
    this.entry = {
      ...data,
      ['meta.lastPassword']: lastPassword,
      ['meta.lastEditedVariable']: LastEditedVariable.LASTPASSWORD,
    };

    return this;
  }

  public setTitle(title: string): this {
    this.entry = {
      ...this.entry,
      title: title,
      ['meta.lastTitle']: title,
      ['meta.lastEditedVariable']: LastEditedVariable.LASTTITLE,
    } as unknown as Partial<IEntry>;
    return this;
  }

  public setUsername(userName: string): this {
    this.entry = {
      ...this.entry,
      userName: userName,
      ['meta.lastUsername']: userName,
      ['meta.lastEditedVariable']: LastEditedVariable.LASTUSERNAME,
    } as unknown as Partial<IEntry>;
    return this;
  }

  public removeMeta(): this {
    const { meta, ...othersEntries } = this.entry;
    const withoutMetaObject = Object.fromEntries(
      Object.keys(othersEntries)
        .filter((key) => !key.includes('meta'))
        .map((key) => [key, othersEntries[key]]),
    );
    this.entry = withoutMetaObject;
    return this;
  }

  removeEmptyVariables(): this {
    const partialEntry: Partial<IEntry> = {};
    Object.keys(this.entry).forEach((entryKey: string) => {
      if (!!this.entry[entryKey] && this.entry[entryKey] !== '')
        partialEntry[entryKey] = this.entry[entryKey];
    });
    this.entry = partialEntry;
    return this;
  }

  public updateEditDate(): this {
    this.entry = {
      ...this.entry,
      ['meta.editDate']: new Date(),
    } as unknown as Partial<IEntry>;
    return this;
  }

  public setState(state: EntryState): this {
    this.entry = {
      ...this.entry,
      state: state,
    };
    return this;
  }
}
