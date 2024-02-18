import { AuthFetch } from "../interfaces/auth.fetch";
import { CryptoDatabase } from "../local-database/cryptoDatabase";
import { LocalDatabases } from "../local-database/init";
import { UserValue } from "../local-database/localDatabase.interface";
import { ExampleTokesResponseForLocalEnvironment } from "../utils/constans.utils";
import { DataBaseLocal } from "./database.local";
import { LocalResponse } from "./response/auth.response";

export class AuthLocal extends DataBaseLocal implements AuthFetch {
  private static instance: AuthLocal | null = null;

  private constructor() {
    super();
  }

  static getInstance(): AuthLocal {
    if (this.instance === null) {
      this.instance = new AuthLocal();
    }
    return this.instance;
  }

  signup(newuserauth: RegisterUser): Promise<LocalResponse> {
    const userDatabase = this.getDatabase("user");
    return userDatabase
      .add({ password: newuserauth.password })
      .then(this.signUpResponseValidation)
      .then((response) => new LocalResponse(response));
  }

  login(userauth: UserAuth): Promise<LocalResponse> {
    return CryptoDatabase.hashPassword(userauth.password).then(
      (hashedPassword) => {
        return (
          LocalDatabases.getInstance()
            .getDatabase("user")
            .getAll()
            .then((users) =>
              this.loginUserCheck(users as UserValue[], hashedPassword)
            ) ?? Promise.reject(new LocalResponse(undefined))
        );
      }
    );
  }

  private signUpResponseValidation(response: unknown) {
    if (response === undefined) throw new Error("Undefined promise value");
    return response;
  }

  private loginUserCheck(
    users: UserValue[],
    hashedPassword: string
  ): LocalResponse {
    const user = users[0];

    return user.password === hashedPassword
      ? new LocalResponse(ExampleTokesResponseForLocalEnvironment)
      : new LocalResponse(undefined);
  }
}
