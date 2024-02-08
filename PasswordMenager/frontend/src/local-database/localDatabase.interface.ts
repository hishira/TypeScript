import { DBSchema, IDBPObjectStore, StoreNames } from "idb";

export type UserValue = {
  id: string;
  password: string;
  isActive: boolean;
};
export type EntryValue = {
  id: string;
};
export interface CommonDatabaseInterface extends DBSchema {
  user: {
    value: UserValue;
    key: string;
    indexes: { "by-id": string };
  };
  entry: {
    value: EntryValue;
    key: string;
    indexes: { "by-id": string };
  };
}

export type DatabaseTypes = UserValue | EntryValue;
export type DatabaseName = 'user' | 'entry';

export type CustomStoreType = IDBPObjectStore<
  CommonDatabaseInterface,
  ArrayLike<StoreNames<CommonDatabaseInterface>>,
  StoreNames<CommonDatabaseInterface>,
  "readwrite"
>;
