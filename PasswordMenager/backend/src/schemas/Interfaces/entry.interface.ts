import {
  AnyKeys,
  AnyObject,
  Document,
  FilterQuery,
  ObjectId,
  Schema,
} from 'mongoose';
import { IEntryMeta, LastEditedVariable } from './entryMeta.interface';
import { Paginator } from 'src/utils/paginator';
import { FilterOption } from './filteroption.interface';
import { EntrySchemaUtils, algorithm } from '../utils/Entry.schema.utils';
import { Cipher } from 'src/utils/cipher.utils';
import { DTO } from '../dto/object.interface';
import { DeleteOption } from './deleteoption.interface';
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

//TODO: Check if can more optimize
export class EntryBuilder {
  constructor(private entry: Partial<IEntry>) {}

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

  public entryPasswordUpdate(
    userid: string | ObjectId,
    lastPassword: string,
    data,
  ): this {
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

export class EntryDtoMapper {
  static encryptDtoPassword(dto: DTO): DTO {
    if (!('password' in dto)) return dto;
    if (!('userid' in dto && typeof dto.password === 'string')) return dto;
    const userid = dto.userid;
    const object = dto.toObject();
    const bs = EntrySchemaUtils.generateKeyValue(userid);
    const password = dto.password;
    const encryptedPassword = new Cipher(
      algorithm,
      bs,
      process.env.id,
    ).encryptValue(password);
    return {
      toObject: () => ({
        ...object,
        password: encryptedPassword,
      }),
    };
  }
}

const EMPTYOPTION = { getOption: () => ({}) };
export class OptionModelBuilder {
  private filterQuery: FilterQuery<IEntry> = {};
  constructor(
    private option:
      | FilterOption<FilterQuery<IEntry>>
      | DeleteOption<FilterQuery<IEntry>> = EMPTYOPTION,
  ) {}

  updateEntryId(entryId: string): this {
    this.filterQuery = {
      ...this.filterQuery,
      _id: entryId,
    };
    return this;
  }

  updateGroupId(groupId: string): this {
    this.filterQuery = {
      ...this.filterQuery,
      groupid: groupId,
    };
    return this;
  }

  updateUserIdOPtion(userid: string): this {
    this.filterQuery = {
      ...this.filterQuery,
      userid,
    };
    return this;
  }

  setGroupIdNull(): this {
    this.filterQuery = {
      ...this.filterQuery,
      groupid: null,
    };
    return this;
  }

  getOption():
    | FilterOption<FilterQuery<IEntry>>
    | DeleteOption<FilterQuery<IEntry>> {
    return {
      getOption: () => this.filterQuery,
    };
  }
}
