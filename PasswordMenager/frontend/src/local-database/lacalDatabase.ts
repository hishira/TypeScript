import { IDBPDatabase, openDB } from "idb";
import { NotDefinedDatabaseError } from "./errors/notDefinedDatabase.error";
import {
  CommonDatabaseInterface,
  CustomStoreType,
  DatabaseName,
  DatabaseTypes,
} from "./localDatabase.interface";

type DatabaseType =  IDBPDatabase<CommonDatabaseInterface>;
export abstract class LocalDatabase {
  private mapCollection: Map<DatabaseName, CustomStoreType> = new Map();
  private db!: DatabaseType

  constructor(
    public readonly dataBaseName: DatabaseName,
    public version: number = 1
  ) {}

  async init() {
    this.db = await openDB<CommonDatabaseInterface>("local", this.version, {
      upgrade: async (db: IDBPDatabase<CommonDatabaseInterface>) => {
        await this.databaseUpdate(db);
      },
    });

    await this.databaseUpdate();
  }

  protected baseAdd(
    value: DatabaseTypes
  ): Promise<string> | undefined {
    return this.db?.add(this.dataBaseName, value);
  }

  abstract add(
    value: CommonDatabaseInterface[keyof CommonDatabaseInterface]["value"]
  ): Promise<unknown>;

  put(object: unknown): Promise<unknown> {
    const db = this.mapCollection.get(this.dataBaseName);
    if (db === undefined) return Promise.resolve(null);
    if (db.put === undefined) return Promise.resolve(null);
    return (db.put as Function)(object);
  }

  getAll(): Promise<DatabaseTypes[]> {
    this.checkIfDatabseDefiled();
    
    return this.db.getAll(this.dataBaseName);
  }

  private checkIfDatabseDefiled() {
    if (this.db === undefined) throw new NotDefinedDatabaseError();
  }

  private async createStore(
    db: IDBPDatabase<CommonDatabaseInterface> | undefined = this.db
  ): Promise<void> {
    if (db === undefined) throw Error("Undefined database");

    const tc = db.transaction(this.dataBaseName, "readwrite");
    const store = tc.objectStore(this.dataBaseName);
    this.mapCollection.set(this.dataBaseName, store);
    await tc.done;
  }

  private async databaseUpdate(
    db: IDBPDatabase<CommonDatabaseInterface> | undefined = this.db
  ) {
    if (db === undefined) throw Error("Undefined database");
    if (!db.objectStoreNames.contains(this.dataBaseName)) {
      const storetc = db.createObjectStore(this.dataBaseName, {
        keyPath: "id",
        autoIncrement: true,
      });
      storetc.createIndex("by-id", "id");
    }
    await this.createStore(db);
  }
}
