import { DBSchema, IDBPObjectStore, StoreNames } from "idb";

export type UserValue = {
  _id: string;
  password: string;
  isActive: boolean;
};
enum EntryState {
  ACTIVE = "active",
  DELETED = "deleted",
  SUSPENDED = "suspended",
}
export type EntryValue = {
  _id: string;
  password: string;
  title: string;
  username: string;
  url: string;
  note: string;
  groupid: string | null;
  userid: string | null;
  state: EntryState;
  passwordExpiredDate: Date | string | null;
};
export type GroupValue = {
  _id: string;
  userid: string;
  name: string;
};

export type DatabaseInterface<DatabaseDocument> = {
  value: DatabaseDocument;
  key: string;
  indexes: { "by-_id": string };
};
export interface CommonDatabaseInterface extends DBSchema {
  user: DatabaseInterface<UserValue>;
  entry: DatabaseInterface<EntryValue>;
  group: DatabaseInterface<GroupValue>;
}

export type DatabaseTypes = UserValue | EntryValue | GroupValue;
export type DatabaseName = "user" | "entry" | "group";

export type CustomStoreType = IDBPObjectStore<
  CommonDatabaseInterface,
  ArrayLike<StoreNames<CommonDatabaseInterface>>,
  StoreNames<CommonDatabaseInterface>,
  "readwrite"
>;
