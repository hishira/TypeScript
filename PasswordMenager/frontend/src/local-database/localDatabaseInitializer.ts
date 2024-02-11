import { CoreDatabase } from "./coreDatabase";
import { DatabaseName } from "./localDatabase.interface";

export class LocalDatabaseInitializer {
  private static instance: LocalDatabaseInitializer | null = null;

  private constructor() {}
  
  static getInstance(): LocalDatabaseInitializer {
    if (this.instance === null) this.instance = new LocalDatabaseInitializer();
    return this.instance;
  }

  addDatabaseToInitialize(databaseName: DatabaseName): void {
    CoreDatabase.getInstance().addDatabaseName(databaseName);
  }

  async initDatabase() {
    await CoreDatabase.getInstance().initDatabase();
  }
}
