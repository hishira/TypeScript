import { IDBPDatabase, IDBPObjectStore, openDB } from "idb";
export abstract class LocalDatabase {
  private mapCollection: Map<string, IDBPObjectStore> = new Map();
  protected db: IDBPDatabase | undefined;
  constructor(public readonly dataBaseName: string, public version: number) {}

  async init() {
    this.db = await openDB("local", this.version, {
      upgrade: async (db: IDBPDatabase) => {
        if (!db.objectStoreNames.contains(this.dataBaseName)) {
          db.createObjectStore(this.dataBaseName, {
            keyPath: "id",
            autoIncrement: true,
          });
          const tc = db.transaction(this.dataBaseName);
          const store = tc.objectStore(this.dataBaseName);
          this.mapCollection.set(this.dataBaseName, store);
          await tc.done;
        } else {
          const tc = db.transaction(this.dataBaseName);
          const store = tc.objectStore(this.dataBaseName);
          this.mapCollection.set(this.dataBaseName, store);
          await tc.done;
        }
      },
    });
  }

  private getCollection(collectionName: string): IDBPObjectStore | undefined {
    return this.mapCollection.get(collectionName);
  }

  abstract get(id: string): any;

  put(object: unknown): Promise<unknown> {
    const db = this.mapCollection.get(this.dataBaseName);
    if (db === undefined) return Promise.resolve(null);
    if (db.put === undefined) return Promise.resolve(null);
    return (db.put as Function)(object);
  }
}
