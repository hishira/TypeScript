import {
  DBSchema,
  IDBPDatabase,
  IDBPObjectStore,
  StoreNames,
  openDB,
} from "idb";
export interface CommonDatabaseInterface extends DBSchema {
  user: {
    value: {
      id: string;
      password: string;
      isActive: boolean;
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
  private static instance: LocalDatabase | null = null;
  private mapCollection: Map<"user", CustomStoreType> = new Map();
  private db: IDBPDatabase<CommonDatabaseInterface> | undefined;

  constructor(
    public readonly dataBaseName: "user",
    public version: number = 1
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
          console.log(this.mapCollection);
          await tc.done;
        }
      },
    });

    if (!this.db.objectStoreNames.contains(this.dataBaseName)) {
      const storetc = this.db.createObjectStore(this.dataBaseName, {
        keyPath: "id",
        autoIncrement: true,
      });
      storetc.createIndex("by-id", "id");
      const tc = this.db.transaction(this.dataBaseName, "readwrite");
      const store = tc.objectStore(this.dataBaseName);
      this.mapCollection.set(this.dataBaseName, store);
      await tc.done;
    } else {
      const tc = this.db.transaction(this.dataBaseName, "readwrite");
      const store = tc.objectStore(this.dataBaseName);
      this.mapCollection.set(this.dataBaseName, store);
      console.log(this.mapCollection);
      await tc.done;
    }
  }

  getStore(): CustomStoreType | undefined {
    try {
      console.log(this.mapCollection);
      if (this.mapCollection.get(this.dataBaseName) === undefined)
        throw Error();

      return this.mapCollection.get(this.dataBaseName);
    } catch {
      console.error("unnkown store name");
    }
  }

  put(object: unknown): Promise<unknown> {
    const db = this.mapCollection.get(this.dataBaseName);
    if (db === undefined) return Promise.resolve(null);
    if (db.put === undefined) return Promise.resolve(null);
    return (db.put as Function)(object);
  }

  getAll(): Promise<any[] | undefined | null> {
    // TODO: Check
    const tc = this.getStore()?.transaction;
    const ct = this.getStore()?.getAll() as Promise<any[]>;
    return tc?.done.then((_) => ct) ?? Promise.resolve(null);
  }

  abstract add(
    value: CommonDatabaseInterface[keyof CommonDatabaseInterface]["value"]
  ): unknown;

  private getCollection(collectionName: "user"): CustomStoreType | undefined {
    return this.mapCollection.get(collectionName);
  }
}
