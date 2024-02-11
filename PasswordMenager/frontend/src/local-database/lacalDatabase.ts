import { CoreDatabase } from "./coreDatabase";
import {
  CommonDatabaseInterface,
  DatabaseName,
  DatabaseTypes,
} from "./localDatabase.interface";

export class LocalDatabase {
  
  constructor(
    public readonly dataBaseName: DatabaseName = "user",
    public version: number = 1
  ) {}

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
