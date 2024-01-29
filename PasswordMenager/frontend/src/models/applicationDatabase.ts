export enum ApplicationDatabaseType {
  ONLINE = "online",
  LOCAL = "local",
}
export class ApplicationDatabase {
  private static instance: ApplicationDatabase | null = null;

  private databaseType: ApplicationDatabaseType | null = null;

  private constructor() {}
  static getInstance(): ApplicationDatabase {
    if (this.instance === null) {
      this.instance = new ApplicationDatabase();
    }
    return this.instance;
  }

  get DataBaseType(): ApplicationDatabaseType | null {
    return this.databaseType;
  }

  set DataBaseType(databaseType: ApplicationDatabaseType | null) {
    this.databaseType = databaseType;
  }

  get isLocal(): boolean {
    return this.databaseType === ApplicationDatabaseType.LOCAL;
  }

  get isOnline(): boolean {
    return this.databaseType === ApplicationDatabaseType.ONLINE;
  }
}
