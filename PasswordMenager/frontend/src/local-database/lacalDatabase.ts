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

  baseAdd(value: DatabaseTypes): Promise<string> {
    return CoreDatabase.getInstance().add(this.dataBaseName, value);
  }

  baseDelete(id: string):Promise<unknown>{
    return CoreDatabase.getInstance().delete(this.dataBaseName,id )
  }

  add(
    value: CommonDatabaseInterface[keyof CommonDatabaseInterface]["value"]
  ): Promise<unknown> {
    return Promise.resolve();
  }

  getAll(databaseName?: DatabaseName): Promise<DatabaseTypes[]> {
    const currentDatabaseName = databaseName ?? this.dataBaseName;
    if (currentDatabaseName === undefined) throw new Error();
    return CoreDatabase.getInstance().getAll(currentDatabaseName);
  }
}
