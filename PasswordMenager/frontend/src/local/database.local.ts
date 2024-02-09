import { NotDefinedDatabaseError } from "../local-database/errors/notDefinedDatabase.error";
import { Databases } from "../local-database/init";
import { LocalDatabase } from "../local-database/lacalDatabase";
import { DatabaseName } from "../local-database/localDatabase.interface";

export class DataBaseLocal {
  getDatabase(name: DatabaseName): LocalDatabase {
    const userDatabase = Databases.getInstance().getDatabase(name);
    console.log(userDatabase);
    if (!(userDatabase && "add" in userDatabase))
      throw new NotDefinedDatabaseError();

    return userDatabase;
  }
}
