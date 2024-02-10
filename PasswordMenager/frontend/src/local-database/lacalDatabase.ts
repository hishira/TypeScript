import { IDBPDatabase, openDB } from "idb";
import { NotDefinedDatabaseError } from "./errors/notDefinedDatabase.error";
import {
  CommonDatabaseInterface,
  CustomStoreType,
  DatabaseName,
  DatabaseTypes,
} from "./localDatabase.interface";

type DatabaseType = IDBPDatabase<CommonDatabaseInterface>;
export class LocalDatabase {
  private mapCollection: Map<DatabaseName, CustomStoreType> = new Map();
  private db!: DatabaseType;

  private static instance: LocalDatabase | null = null;

  private dataBasedNames: DatabaseName[] = [];
  constructor(
    public readonly dataBaseName: DatabaseName = "user",
    public version: number = 1
  ) {}

  static getInstance(): LocalDatabase {
    if (this.instance === null) this.instance = new LocalDatabase();
    return this.instance;
  }

  addDatabaseName(databaseName: DatabaseName) {
    this.dataBasedNames.push(databaseName);
  }

  async initDatabase() {
    this.db = await openDB<CommonDatabaseInterface>("local", this.version, {
      upgrade: async (db: IDBPDatabase<CommonDatabaseInterface>) => {
        await this.databaseUpdate(db);
      },
    });

    await this.databaseUpdate();
  }

  baseAdd(value: DatabaseTypes): Promise<string> | undefined {
    return LocalDatabase.getInstance().db.add(this.dataBaseName, value);
  }

  add(
    value: CommonDatabaseInterface[keyof CommonDatabaseInterface]["value"]
  ): Promise<unknown> {
    return Promise.resolve();
  }

  put(object: unknown): Promise<unknown> {
    const db = this.mapCollection.get(this.dataBaseName);
    if (db === undefined) return Promise.resolve(null);
    if (db.put === undefined) return Promise.resolve(null);
    return (db.put as Function)(object);
  }

  getAll(databaseName?: DatabaseName): Promise<DatabaseTypes[]> {
    this.checkIfDatabseDefiled();
    if (databaseName === undefined) throw new Error();
    return LocalDatabase.getInstance().db.getAll(databaseName);
  }

  private checkIfDatabseDefiled() {
    if (LocalDatabase.getInstance().db === undefined)
      throw new NotDefinedDatabaseError();
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
    this.dataBasedNames.forEach(async (dataBaseName) => {
      if (db === undefined) throw Error("Undefined database");
      if (!db.objectStoreNames.contains(dataBaseName)) {
        const storetc = db.createObjectStore(dataBaseName, {
          keyPath: "id",
          autoIncrement: true,
        });
        storetc.createIndex("by-id", "id");
      }
      await this.createStore(db);
    });
  }
}
