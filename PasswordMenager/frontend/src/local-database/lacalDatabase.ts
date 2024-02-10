import { CoreDatabase } from "./coreDatabase";
import {
  CommonDatabaseInterface,
  DatabaseName,
  DatabaseTypes,
} from "./localDatabase.interface";

export class LocalDatabase {
  private static instance: LocalDatabase | null = null;

  constructor(
    public readonly dataBaseName: DatabaseName = "user",
    public version: number = 1
  ) {}

  static getInstance(): LocalDatabase {
    if (this.instance === null) this.instance = new LocalDatabase();
    return this.instance;
  }

  addDatabaseName(databaseName: DatabaseName) {
    CoreDatabase.getInstance().addDatabaseName(databaseName);
  }

  async initDatabase() {
    await CoreDatabase.getInstance().initDatabase();
  }

  baseAdd(value: DatabaseTypes): Promise<string> | undefined {
    return CoreDatabase.getInstance().add(this.dataBaseName, value);
  }

  add(
    value: CommonDatabaseInterface[keyof CommonDatabaseInterface]["value"]
  ): Promise<unknown> {
    return Promise.resolve();
  }

  getAll(databaseName?: DatabaseName): Promise<DatabaseTypes[]> {
    if (databaseName === undefined) throw new Error();
    return CoreDatabase.getInstance().getAll(databaseName);
  }
}
