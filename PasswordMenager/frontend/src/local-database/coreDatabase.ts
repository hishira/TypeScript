import { IDBPDatabase, openDB } from "idb";
import { NotDefinedDatabaseError } from "./errors/notDefinedDatabase.error";
import {
  CommonDatabaseInterface,
  DatabaseName,
  DatabaseTypes,
} from "./localDatabase.interface";

export type DatabaseType = IDBPDatabase<CommonDatabaseInterface>;

export class CoreDatabase {
  private static instance: CoreDatabase | null = null;
  private db!: DatabaseType;
  private databaseNames: DatabaseName[] = [];

  private constructor(private readonly version = 1) {}
  static getInstance(): CoreDatabase {
    if (this.instance === null) this.instance = new CoreDatabase();
    return this.instance;
  }

  add(databaseName: DatabaseName, value: DatabaseTypes) {
    this.checkIfDatabseIsDefined();
    return this.db.add(databaseName, value);
  }

  addDatabaseName(databaseName: DatabaseName): void {
    this.databaseNames.push(databaseName);
  }

  getAll(databaseName: DatabaseName): Promise<DatabaseTypes[]> {
    this.checkIfDatabseIsDefined();
    return this.db.getAll(databaseName);
  }

  async initDatabase() {
    this.db = await openDB<CommonDatabaseInterface>("local", this.version, {
      upgrade: async (db: IDBPDatabase<CommonDatabaseInterface>) => {
        await this.databaseUpdate(db);
      },
    });

    await this.databaseUpdate();
  }

  private async databaseUpdate(
    db: IDBPDatabase<CommonDatabaseInterface> | undefined = this.db
  ) {
    this.databaseNames.forEach(async (dataBaseName) => {
      if (db === undefined) throw Error("Undefined database");
      if (!db.objectStoreNames.contains(dataBaseName)) {
        const storetc = db.createObjectStore(dataBaseName, {
          keyPath: "id",
          autoIncrement: true,
        });
        storetc.createIndex("by-id", "id");
      }
    });
  }

  private checkIfDatabseIsDefined() {
    if (CoreDatabase.getInstance().db === undefined)
      throw new NotDefinedDatabaseError();
  }
}
