import { DBSchema, IDBPObjectStore, StoreNames } from "idb";

export type UserValue = {
  id: string;
  password: string;
  isActive: boolean;
};
enum EntryState {
  ACTIVE = 'active',
  DELETED = 'deleted',
  SUSPENDED = 'suspended',
}
export type EntryValue = {
  id: string;
  password: string;
  title: string;
  username: string;
  url: string;
  email: string;
  note: string;
  groupid: string | null;
  userid: string | null;
  state:  EntryState
  passwordExpiredDate: Date | string | null
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
export type DatabaseName = "user" | "entry";

export type CustomStoreType = IDBPObjectStore<
  CommonDatabaseInterface,
  ArrayLike<StoreNames<CommonDatabaseInterface>>,
  StoreNames<CommonDatabaseInterface>,
  "readwrite"
>;
