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
import { CreateEntryDto } from '../dto/createentry.dto';
import { EditEntryDto } from '../dto/editentry.dto';
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
  readonly passwordExpiredDate?: Date | string;
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
    const hasState = 'state' in this.option.getOption();
    return {
      ...this.option.getOption(),
      ...(!hasState && { state: this.state }),
    };
  }
}

type EntryUpdateSet = AnyKeys<IEntry> & AnyObject;
export class DeleteEntryUpdate {
  constructor(
    public $set: EntryUpdateSet = {
      state: EntryState.DELETED,
      ['meta.deleteDate']: Date.now(),
    },
  ) {}
}

//TODO: Check if can more optimize
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

  static CreateEntryDtoToDto(
    entryCreateDTO: CreateEntryDto,
    userid: string,
  ): DTO {
    const entryToAdd = entryCreateDTO;
    const isGroupIdEmpty = entryToAdd.groupid === '';
    let restParams: Partial<CreateEntryDto> = entryCreateDTO;
    if (isGroupIdEmpty) {
      const { groupid, ...restEntryParams } = entryToAdd;
      restParams = restEntryParams;
    }

    return new (class implements DTO {
      toObject() {
        return {
          ...(isGroupIdEmpty && restParams ? restParams : entryCreateDTO),
          userid: userid,
        };
      }
    })();
  }

  static GetPartialUpdateEntry(editEntryDTO: EditEntryDto): Partial<IEntry> {
    return new EntryBuilder()
      .updateEntryId(editEntryDTO._id)
      .setTitle(editEntryDTO.title)
      .updatePasswordWithoutHashing(editEntryDTO.password)
      .entryNoteUpdate(editEntryDTO.note)
      .setUsername(editEntryDTO.username)
      .updateUrl(editEntryDTO.url)
      .updatePasswordExpireDate(editEntryDTO.passwordExpiredDate)
      .removeMeta()
      .removeEmptyVariables()
      .getEntry();
  }
}

const EMPTYOPTION = { getOption: () => ({}) };
export class OptionModelBuilder {
  private filterQuery: FilterQuery<IEntry> = {};
  constructor(
    private option:
      | FilterOption<FilterQuery<IEntry>>
      | DeleteOption<FilterQuery<IEntry>> = EMPTYOPTION,
    private queryLimit: number = -1,
  ) {}

  updateStateEntry(state: EntryState): this {
    this.filterQuery = {
      ...this.filterQuery,
      state: state,
    };
    return this;
  }
  updateEntryId(entryId: string): this {
    this.filterQuery = {
      ...this.filterQuery,
      _id: entryId,
    };
    return this;
  }

  updateLimit(limit: number): this {
    this.queryLimit = limit;
    return this;
  }
  updateGroupId(groupId: string): this {
    this.filterQuery = {
      ...this.filterQuery,
      groupid: groupId,
    };
    return this;
  }

  updateGroupIdOrNull(groupId: string): this {
    this.filterQuery = {
      ...this.filterQuery,
      groupid: groupId !== '' ? groupId : null,
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
      ...(this.queryLimit > 0 && { limit: this.queryLimit }),
    };
  }
}
