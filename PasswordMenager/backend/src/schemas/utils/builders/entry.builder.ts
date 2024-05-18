import { ObjectId } from 'mongoose';
import { EntryState, IEntry } from 'src/schemas/Interfaces/entry.interface';
import { LastEditedVariable } from 'src/schemas/Interfaces/entryMeta.interface';
import { EditEntryDto } from 'src/schemas/dto/editentry.dto';
import { EntryDtoMapper } from 'src/schemas/mapper/entryDtoMapper';
import { Cipher } from 'src/utils/cipher.utils';
import { isDefined } from 'src/utils/utils';
import { EntrySchemaUtils, algorithm } from '../Entry.schema.utils';

export class EntryBuilder {
  constructor(private entry: Partial<IEntry> = {}) {}

  updateBaseOnEditEntryDto(editEntryDto?: EditEntryDto): this {
    this.entry = isDefined(editEntryDto)
      ? EntryDtoMapper.GetPartialUpdateEntry(editEntryDto)
      : this.entry;
    return this;
  }

  updateIdIfExista(id?: string): this {
    this.entry = {
      ...this.entry,
      ...(isDefined(id) && { _id: id }),
    };
    return this;
  }

  updatenNote(note: string | undefined): this {
    this.entry = {
      ...this.entry,
      ...(isDefined(note) && { note: note }),
    };

    return this;
  }

  updateEmail(email: string | undefined): this {
    this.entry = {
      ...this.entry,
      ...(isDefined(email) && { email: email }),
    };

    return this;
  }

  updateStateIfExists(entryState?: EntryState): this {
    this.entry = {
      ...this.entry,
      ...(isDefined(entryState) && { state: entryState }),
    };
    return this;
  }
  getEntry(): Partial<IEntry> {
    return this.entry;
  }

  entryNoteUpdate(note: string): this {
    this.entry = {
      ...this.entry,
      ['meta.lastNote']: note,
      ['meta.lastEditedVariable']: LastEditedVariable.LASTNOTE,
    } as unknown as Partial<IEntry>;

    return this;
  }

  updateEntryId(id: string): this {
    this.entry = {
      ...this.entry,
      _id: id,
    };
    return this;
  }

  updatePasswordWithoutHashing(password: string): this {
    this.entry = {
      ...this.entry,
      password: password,
    };
    return this;
  }

  updatePasswordExpireDate(passowordExpireDate: Date): this {
    this.entry = {
      ...this.entry,
      passwordExpiredDate: passowordExpireDate,
    };
    return this;
  }

  updateUrl(newUrl: string): this {
    this.entry = {
      ...this.entry,
      url: newUrl,
    };

    return this;
  }

  entryPasswordUpdate(
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

  setTitle(title: string): this {
    this.entry = {
      ...this.entry,
      title: title,
      ['meta.lastTitle']: title,
      ['meta.lastEditedVariable']: LastEditedVariable.LASTTITLE,
    } as unknown as Partial<IEntry>;
    return this;
  }

  setUsername(userName: string): this {
    this.entry = {
      ...this.entry,
      username: userName,
      ['meta.lastUsername']: userName,
      ['meta.lastEditedVariable']: LastEditedVariable.LASTUSERNAME,
    } as unknown as Partial<IEntry>;
    return this;
  }

  removeMeta(): this {
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

  updateEditDate(): this {
    this.entry = {
      ...this.entry,
      ['meta.editDate']: new Date(),
    } as unknown as Partial<IEntry>;
    return this;
  }

  setState(state: EntryState): this {
    this.entry = {
      ...this.entry,
      state: state,
    };
    return this;
  }

  static partialBuildEntry(
    builder: EntryBuilder,
    entry: Partial<IEntry>,
    data: Partial<IEntry>,
    updatedEntry: Partial<IEntry>,
    entryUpdateObject: UpdateEntryCheck,
  ): void {
    builder
      .partialUpdateNote(entryUpdateObject, entry)
      .partialPasswordUpdate(entryUpdateObject, updatedEntry, data)
      .partialTitleUpdate(entryUpdateObject, entry)
      .partialUserNameUpdate(entryUpdateObject, entry)
      .partialStateUpdate(entryUpdateObject, entry);
  }

  partialUpdateNote(
    entryUpdateObject: UpdateEntryCheck,
    entry: Partial<IEntry>,
  ): this {
    if (entryUpdateObject.noteUpdate) {
      this.entryNoteUpdate(entry.note);
    }
    return this;
  }

  partialPasswordUpdate(
    entryUpdateObject: UpdateEntryCheck,
    updatedEntry: Partial<IEntry>,
    data: Partial<IEntry>,
  ): this {
    if (entryUpdateObject.passwordUpdate) {
      this.entryPasswordUpdate(
        updatedEntry.userid,
        updatedEntry.password,
        data,
      );
    }
    return this;
  }

  partialTitleUpdate(
    entryUpdateObject: UpdateEntryCheck,
    entry: Partial<IEntry>,
  ): this {
    if (entryUpdateObject.titleUpdate) {
      this.setTitle(entry.title);
    }
    return this;
  }

  partialUserNameUpdate(
    entryUpdateObject: UpdateEntryCheck,
    entry: Partial<IEntry>,
  ): this {
    if (entryUpdateObject.userNameUpdate) {
      this.setUsername(entry.username);
    }
    return this;
  }

  partialStateUpdate(
    entryUpdateObject: UpdateEntryCheck,
    entry: Partial<IEntry>,
  ): this {
    if (entryUpdateObject.stateUpdate) {
      this.setState(entry.state);
    }
    return this;
  }
}
