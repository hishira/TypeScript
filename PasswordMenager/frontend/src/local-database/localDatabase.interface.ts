import { DBSchema, IDBPObjectStore, StoreNames } from "idb";

export type UserValue = {
  id: string;
  password: string;
  isActive: boolean;
};
export interface CommonDatabaseInterface extends DBSchema {
  user: {
    value: UserValue;
    key: string;
    indexes: { "by-id": string };
  };
}
export type CustomStoreType = IDBPObjectStore<
  CommonDatabaseInterface,
  ArrayLike<StoreNames<CommonDatabaseInterface>>,
  StoreNames<CommonDatabaseInterface>,
  "readwrite"
>;
