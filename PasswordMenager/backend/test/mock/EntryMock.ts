import { FilterQuery, Types } from 'mongoose';
import { IEntry } from 'src/schemas/Interfaces/entry.interface';
import { FilterOption } from 'src/schemas/Interfaces/filteroption.interface';
import { CreateEntryDto } from 'src/schemas/dto/createentry.dto';
import { EditEntryDto } from 'src/schemas/dto/editentry.dto';
import { TestDataUtils } from '../utils/TestDataUtils';
const ID = new Types.ObjectId(32);
const GROUPID = new Types.ObjectId(32);
const DATENOW = Date.now();
export const entryMock = (entry?: IEntry): IEntry =>
  entry ??
  ({
    _id: ID,
    title: 'test title',
    userid: 'asd123cxz',
    username: 'test username',
    password: 'dupa123',
    note: 'dupa',
    groupid: GROUPID,
    passwordExpiredDate: DATENOW,
    meta: {
      crateDate: DATENOW,
      firstEditDate: DATENOW,
      editDate: DATENOW,
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
  toObject: (): Record<string, unknown> => ({}),
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
  getOption: (): { _id: string } => ({ _id: 'asd123' }),
});
export interface Executable<T> {
  exec: () => T;
}
export class EntryMockModel {
  constructor(private data: Partial<IEntry>) {}

  save(): Promise<Partial<IEntry>> {
    return Promise.resolve(this.data);
  }

  static exec = jest.fn();

  static find(potion): Skipable<Executable<Promise<Partial<IEntry[]>>>> {
    return {
      skip: (
        toSkip: number,
      ): {
        limit: (limit: number) => Executable<Promise<[IEntry, IEntry]>>;
      } => ({
        limit: (toLimit: number): Executable<Promise<[IEntry, IEntry]>> => ({
          exec: (): Promise<[IEntry, IEntry]> =>
            Promise.resolve([entryMock(), entryMock()]),
        }),
      }),
      exec: (): Promise<[IEntry, IEntry]> =>
        Promise.resolve([entryMock(), entryMock()]),
    };
  }

  static findOne(option): Executable<Promise<Partial<IEntry>>> {
    return {
      exec: (): Promise<IEntry> => Promise.resolve(entryMock()),
    };
  }

  static readonly findOneAndUpdate = jest.fn().mockResolvedValue({});

  static readonly deleteOne = jest.fn().mockResolvedValue(true);

  static deleteMany(): Executable<Promise<true>> {
    return { exec: (): Promise<true> => Promise.resolve(true) };
  }

  static updateMany(): Executable<Promise<boolean>> {
    return { exec: (): Promise<true> => Promise.resolve(true) };
  }

  static findByIdAndUpdate(): Executable<Promise<IEntry>> {
    return {
      exec: (): Promise<IEntry> => Promise.resolve(entryMock()),
    };
  }
  static findByIdAndDelete(id: string): Executable<Promise<true>> {
    return {
      exec: (): Promise<true> => Promise.resolve(true),
    };
  }

  static findById(id: string): Promise<IEntry> {
    return Promise.resolve(entryMock());
  }

  static updateOne(filterOption, objectOption): Promise<IEntry> {
    return Promise.resolve(entryMock());
  }

  static getValues = (): Record<string, unknown> => ({
    new: <T>(val: T): T => val,
    constructor: <T>(val: T): T => val,
    exec: jest.fn(),
    find: jest.fn().mockResolvedValue({}),
    findOne: jest.fn().mockResolvedValue({}),
    findOneAndUpdate: jest.fn().mockResolvedValue({}),
    deleteOne: jest.fn().mockResolvedValue(true),
  });
}
