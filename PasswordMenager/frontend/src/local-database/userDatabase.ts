import { CryptoDatabase } from "./cryptoDatabase";
import { LocalDatabase } from "./lacalDatabase";

export class UserDatabase extends LocalDatabase {
  constructor() {
    super("user");
  }

  override async add(userDto: { password: string }) {
    const user = {
      id: CryptoDatabase.generateRandomId(),
      password: await CryptoDatabase.hashPassword(userDto.password),
      isActive: true,
    };
    this.getStore()?.add(user);
  }
}
