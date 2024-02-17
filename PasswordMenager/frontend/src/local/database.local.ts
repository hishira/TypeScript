import { NotDefinedDatabaseError } from "../local-database/errors/notDefinedDatabase.error";
import { LocalDatabases } from "../local-database/init";
import { LocalDatabase } from "../local-database/lacalDatabase";
import { DatabaseName } from "../local-database/localDatabase.interface";

export class DataBaseLocal {
  getDatabase(name: DatabaseName): LocalDatabase {
    const userDatabase = LocalDatabases.getInstance().getDatabase(name);
    if (!(userDatabase && "add" in userDatabase))
      throw new NotDefinedDatabaseError();

    return userDatabase;
  }
}
