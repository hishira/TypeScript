import { AuthFetch } from "../interfaces/auth.fetch";
import { CryptoDatabase } from "../local-database/cryptoDatabase";
import { NotDefinedDatabaseError } from "../local-database/errors/notDefinedDatabase.error";
import { Databases } from "../local-database/init";
import { LocalDatabase } from "../local-database/lacalDatabase";
import { UserValue } from "../local-database/localDatabase.interface";
import { AuthResponse } from "./response/auth.response";

export class AuthLocal implements AuthFetch {
  private static instance: AuthLocal | null = null;

  private constructor() {}
  static getInstance(): AuthLocal {
    if (this.instance === null) {
      this.instance = new AuthLocal();
    }
    return this.instance;
  }
  signUpResponseValidation(response: unknown) {
    if (response === undefined) throw new Error("Undefined promise value");
    return response;
  }

  getUserDatabase(): LocalDatabase {
    const userDatabase = Databases.getInstance().getDatabase("user");
    if (!(userDatabase && "add" in userDatabase))
      throw new NotDefinedDatabaseError();
    return userDatabase;
  }
  signup(newuserauth: RegisterUser): Promise<AuthResponse> {
    const userDatabase = this.getUserDatabase();
    return userDatabase
      .add({ password: newuserauth.password })
      .then(this.signUpResponseValidation)
      .then((response) => new AuthResponse(response));
  }

  loginUserCheck(users: UserValue[], hashedPassword: string): AuthResponse {
    const user = users[0];

    return user.password === hashedPassword
      ? new AuthResponse({
          access_token: "example_access_token",
          refresh_token: "123123",
        })
      : new AuthResponse(undefined);
  }

  login(userauth: UserAuth): Promise<AuthResponse> {
    return CryptoDatabase.hashPassword(userauth.password).then(
      (hashedPassword) => {
        return (
          Databases.getInstance()
            .getDatabase("user")
            ?.getAll()
            .then((users) => this.loginUserCheck(users, hashedPassword)) ??
          Promise.reject(new AuthResponse(undefined))
        );
      }
    );
  }
}
