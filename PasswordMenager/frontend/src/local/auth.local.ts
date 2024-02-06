import { AuthFetch } from "../interfaces/auth.fetch";
import { CryptoDatabase } from "../local-database/cryptoDatabase";
import { Databases } from "../local-database/init";
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
  signup(newuserauth: RegisterUser): Promise<AuthResponse> {
    return (
      Databases.getInstance()
        .getDatabase("user")
        ?.add({ password: newuserauth.password })
        .then((response) => {
          if (response === undefined)
            throw new Error("Undefined promise value");
          return new AuthResponse(response);
        }) ?? Promise.reject(new Error("Undefined promise value"))
    );
  }

  login(userauth: UserAuth): Promise<AuthResponse> {
    return CryptoDatabase.hashPassword(userauth.password).then(
      (hashedPassword) => {
        return (
          Databases.getInstance()
            .getDatabase("user")
            ?.getAll()
            .then((users) => {
              const user = users[0];

              return user.password === hashedPassword
                ? new AuthResponse({
                    access_token: "example_access_token",
                    refresh_token: "123123",
                  })
                : new AuthResponse(undefined);
            }) ?? Promise.reject(new AuthResponse(undefined))
        );
      }
    );
  }
}
