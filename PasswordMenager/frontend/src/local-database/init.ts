import { databases } from "./database.provider";
import { LocalDatabase } from "./lacalDatabase";
import { CommonDatabaseInterface } from "./localDatabase.interface";
import { LocalDatabaseInitializer } from "./localDatabaseInitializer";

export const DatabaseInit = async (): Promise<boolean> => {
  return new Promise<boolean>(async (resole, reject) => {
    databases.forEach(async (database) => {
      LocalDatabaseInitializer.getInstance().addDatabaseToInitialize(database.dataBaseName);
      LocalDatabases.getInstance().addDatabase(database.dataBaseName, database);
    });
    await LocalDatabaseInitializer.getInstance().initDatabase();
    resole(true);
  });
};

export class LocalDatabases {
  private static instance: LocalDatabases | null = null;
  public map: Map<keyof CommonDatabaseInterface, LocalDatabase> = new Map();

  private constructor() {}
  static getInstance(): LocalDatabases {
    if (this.instance === null) this.instance = new LocalDatabases();
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