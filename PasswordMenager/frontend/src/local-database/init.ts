import { databases } from "./database.provider";
import { LocalDatabase } from "./lacalDatabase";
import { CommonDatabaseInterface } from "./localDatabase.interface";

export const DatabaseInit = async (): Promise<boolean> => {
  return new Promise<boolean>(async (resole, reject) => {
    databases.forEach(async (database) => {
      //await database.init();
      LocalDatabase.getInstance().addDatabaseName(database.dataBaseName);
      Databases.getInstance().addDatabase(database.dataBaseName, database);
    });
    await LocalDatabase.getInstance().initDatabase();
    resole(true);
  });
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
