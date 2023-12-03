import { IEntry } from 'src/schemas/Interfaces/entry.interface';

export type EntryWithMessageResponse =
  | IEntry
  | {
      message: string;
    };
