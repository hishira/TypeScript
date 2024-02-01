import { CryptoDatabase } from "./cryptoDatabase";
import { LocalDatabase } from "./lacalDatabase";

export class UserDatabase extends LocalDatabase {
  private readonly databaseName = "user";
  constructor() {
    super("user");
  }

  async add(userDto: { password: string }) {
    const user = {
      id: CryptoDatabase.generateRandomId(),
      password: await CryptoDatabase.hashPassword(userDto.password),
    };
    this.getStore(this.dataBaseName)?.add(user);
  }
}
