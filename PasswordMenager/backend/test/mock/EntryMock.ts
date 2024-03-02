import { FilterQuery, Types } from 'mongoose';
import { IEntry } from 'src/schemas/Interfaces/entry.interface';
import { FilterOption } from 'src/schemas/Interfaces/filteroption.interface';
import { CreateEntryDto } from 'src/schemas/dto/createentry.dto';
import { EditEntryDto } from 'src/schemas/dto/editentry.dto';
import { TestDataUtils } from '../utils/TestDataUtils';
export const entryMock = (entry?: IEntry): IEntry =>
  entry ??
  ({
    _id: new Types.ObjectId(32),
    title: 'test title',
    userid: 'asd123cxz',
    username: 'test username',
    password: 'dupa123',
    note: 'dupa',
    groupid: new Types.ObjectId(32),
    passwordExpiredDate: Date.now(),
    meta: {
      crateDate: Date.now(),
      firstEditDate: Date.now(),
      editDate: Date.now(),
      lastNote: null,
      lastPassword: null,
      lastTitle: null,
      lastUsername: null,
      lastEditedVariable: null,
    },
  } as unknown as IEntry);

export const CreateEntryDtoMock = (): CreateEntryDto => ({
  title: 'title_example',
  username: 'usernameexample',
  password: 'password_example',
  note: 'note_example',
  groupid: TestDataUtils.getRandomObjectIdAsString(),
  passwordExpiredDate: new Date(Date.now()).toLocaleDateString(),
  email: 'test-email@email.com',
  url: 'http://google.com',
  toObject: () => ({}),
});

export const EditEntryDtoMock = (): EditEntryDto => ({
  _id: TestDataUtils.getRandomObjectIdAsString(),
  username: 'example_edited_username',
  password: 'example_edited_password',
  note: 'example_edited_note',
  title: 'example_edited_title',
  email: 'test-email@email.com',
  url: 'http://google.com',
  passwordExpiredDate: new Date(),
});

type Skipable<T extends Record<string, any>> = T & {
  skip: (toSkip: number) => any;
};
export const ExampleEntryGetOptionObject: () => FilterOption<
  FilterQuery<IEntry>
> = () => ({
  getOption: () => ({ _id: 'asd123' }),
});
interface Executable<T> {
  exec: () => T;
}
export class EntryMockModel {
  constructor(private data: Partial<IEntry>) {}

  save() {
    return Promise.resolve(this.data);
  }

  static exec = jest.fn();

  static find(potion): Skipable<Executable<Promise<Partial<IEntry[]>>>> {
    return {
      skip: (toSkip: number) => ({
        limit: (toLimit: number) => ({
          exec: () => Promise.resolve([entryMock(), entryMock()]),
        }),
      }),
      exec: () => Promise.resolve([entryMock(), entryMock()]),
    };
  }

  static findOne(option): Executable<Promise<Partial<IEntry>>> {
    return {
      exec: () => Promise.resolve(entryMock()),
    };
  }

  static readonly findOneAndUpdate = jest.fn().mockResolvedValue({});

  static readonly deleteOne = jest.fn().mockResolvedValue(true);

  static deleteMany() {
    return { exec: () => Promise.resolve(true) };
  }

  static updateMany(): Executable<boolean> {
    return { exec: () => true };
  }

  static findByIdAndUpdate(): Executable<Promise<IEntry>> {
    return {
      exec: () => Promise.resolve(entryMock()),
    };
  }
  static findByIdAndDelete(id: string) {
    return {
      exec: () => Promise.resolve(true),
    };
  }

  static findById(id: string): Promise<IEntry> {
    return Promise.resolve(entryMock());
  }

  static updateOne(filterOption, objectOption) {
    return Promise.resolve(entryMock());
  }

  static getValues = () => ({
    new: (val) => val,
    constructor: (val) => val,
    exec: jest.fn(),
    find: jest.fn().mockResolvedValue({}),
    findOne: jest.fn().mockResolvedValue({}),
    findOneAndUpdate: jest.fn().mockResolvedValue({}),
    deleteOne: jest.fn().mockResolvedValue(true),
  });
}
