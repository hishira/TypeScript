import { AnyKeys, AnyObject, Document, FilterQuery, Schema } from 'mongoose';
import { IEntryMeta, LastEditedVariable } from './entryMeta.interface';
import { Paginator } from 'src/utils/paginator';
import { FilterOption } from './filteroption.interface';
import { EntrySchemaUtils, algorithm } from '../utils/Entry.schema.utils';
import { Cipher } from 'src/utils/cipher.utils';
export enum EntryState {
  ACTIVE = 'active',
  DELETED = 'deleted',
  SUSPENDED = 'suspended',
}
export interface IEntry extends Document {
  readonly _id: string;
  readonly title: string;
  readonly username: string;
  password: string;
  readonly note: string;
  readonly url: string;
  readonly groupid: Schema.Types.ObjectId | string;
  readonly userid: Schema.Types.ObjectId;
  readonly email: string;
  readonly passwordExpiredDate?: Date;
  readonly meta: IEntryMeta;
  readonly state: EntryState;
}

export type EntryData = {
  data: IEntry[];
  pageInfo: Paginator;
};

//TODO check
export class ActiveEntryFilter {
  constructor(
    private readonly option: FilterOption<FilterQuery<IEntry>>,
    public readonly state: EntryState = EntryState.ACTIVE,
  ) {}

  public Filter(): FilterQuery<IEntry> {
    return {
      ...this.option.getOption(),
      state: this.state,
    };
  }
}

type EntryUpdateSet = AnyKeys<IEntry> & AnyObject;
export class DeleteEntryUpdate {
  constructor(public $set: EntryUpdateSet = { state: EntryState.DELETED }) {}
}

//TODO: End entry builder
export class EntryBuilder {
  constructor(public entry: Partial<IEntry>) {}

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

  public entryPasswordUpdate(userid: string, lastPassword: string, data): this {
    const bs = EntrySchemaUtils.generateKeyValue(userid);
    const { password } = data;
    data = {
      ...data,
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
      ['meta.lastTitle']: title,
      ['meta.lastEditedVariable']: LastEditedVariable.LASTTITLE,
    } as unknown as Partial<IEntry>;
    return this;
  }

  public setUsername(userName: string): this {
    this.entry = {
      ...this.entry,
      ['meta.lastUsername']: userName,
      ['meta.lastEditedVariable']: LastEditedVariable.LASTUSERNAME,
    } as unknown as Partial<IEntry>;
    return this;
  }

  public updateEditDate(): this {
    this.entry = {
      ...this.entry,
      ['meta.editDate']: new Date(),
    } as unknown as Partial<IEntry>;
    return this;
  }
}
