import { databases } from "./database.provider";
import { CommonDatabaseInterface, LocalDatabase } from "./lacalDatabase";

export const DatabaseInit = async (): Promise<boolean> => {
  return new Promise<boolean>((resole, reject)=>{
    databases.forEach(async (database) => {
      await database.init();
      Databases.getInstance().addDatabase(database.dataBaseName, database);
    });
    resole(true)
  })
};

export class Databases {
  private static instance: Databases | null = null;
  public map: Map<keyof CommonDatabaseInterface, LocalDatabase> = new Map();

  private constructor() {}
  static getInstance(): Databases {
    if (this.instance === null) this.instance = new Databases();
    return this.instance;
  }

  addDatabase(
    databaseName: keyof CommonDatabaseInterface,
    localDatabase: LocalDatabase
  ) {
    this.map.set(databaseName, localDatabase);
  }

  getDatabase(
    databaseName: keyof CommonDatabaseInterface
  ): LocalDatabase | undefined {
    return this.map.get(databaseName);
  }
}
