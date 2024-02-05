import { CryptoDatabase } from "./cryptoDatabase";
import { LocalDatabase } from "./lacalDatabase";

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
          id: CryptoDatabase.generateRandomId(),
          password: hashedPassword,
          isActive: true,
        };
        return this.baseAdd(user);
      }
    );
  }
}
