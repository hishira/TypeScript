import { CryptoDatabase } from "./cryptoDatabase";
import { LocalDatabase } from "./lacalDatabase";
import { DatabaseName, DatabaseTypes } from "./localDatabase.interface";

export class UserDatabase extends LocalDatabase {
  constructor() {
    super("user");
  }

  override async add(userDto: {
    password: string;
  }): Promise<string | undefined> {
    return CryptoDatabase.hashPassword(userDto.password).then(
      (hashedPassword) => {
        const user = {
          _id: CryptoDatabase.generateRandomId(),
          password: hashedPassword,
          isActive: true,
        };
        return this.baseAdd(user);
      }
    );
  }

  override getAll(databaseName?: DatabaseName): Promise<DatabaseTypes[]> {
    return super.getAll(this.dataBaseName);
  }
}
