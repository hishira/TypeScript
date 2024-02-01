import {
  DBSchema,
  IDBPDatabase,
  IDBPObjectStore,
  StoreNames,
  openDB,
} from "idb";
interface CommonDatabaseInterface extends DBSchema {
  user: {
    value: {
      id: string;
      password: string;
    };
    key: string;
    indexes: { "by-id": string };
  };
}
type CustomStoreType = IDBPObjectStore<
  CommonDatabaseInterface,
  ArrayLike<StoreNames<CommonDatabaseInterface>>,
  StoreNames<CommonDatabaseInterface>,
  "readwrite"
>;
export abstract class LocalDatabase {
  private mapCollection: Map<"user", CustomStoreType> = new Map();
  private db: IDBPDatabase<CommonDatabaseInterface> | undefined;
  constructor(
    public readonly dataBaseName: "user",
    public version: number = 0
  ) {}

  async init() {
    this.db = await openDB<CommonDatabaseInterface>("local", this.version, {
      upgrade: async (db: IDBPDatabase<CommonDatabaseInterface>) => {
        if (!db.objectStoreNames.contains(this.dataBaseName)) {
          const storetc = db.createObjectStore(this.dataBaseName, {
            keyPath: "id",
            autoIncrement: true,
          });
          storetc.createIndex("by-id", "id");
          const tc = db.transaction(this.dataBaseName, "readwrite");
          const store = tc.objectStore(this.dataBaseName);
          this.mapCollection.set(this.dataBaseName, store);
          await tc.done;
        } else {
          const tc = db.transaction(this.dataBaseName, "readwrite");
          const store = tc.objectStore(this.dataBaseName);
          this.mapCollection.set(this.dataBaseName, store);
          await tc.done;
        }
      },
    });
  }

  getStore(storeName: "user"): CustomStoreType | undefined {
    try {
      if (this.mapCollection.get(storeName) === undefined) throw Error();

      return this.mapCollection.get(storeName);
    } catch {
      console.error("unnkown store name");
    }
  }

  private getCollection(collectionName: "user"): CustomStoreType | undefined {
    return this.mapCollection.get(collectionName);
  }

  //abstract get(id: string): any;

  put(object: unknown): Promise<unknown> {
    const db = this.mapCollection.get(this.dataBaseName);
    if (db === undefined) return Promise.resolve(null);
    if (db.put === undefined) return Promise.resolve(null);
    return (db.put as Function)(object);
  }
}
