import { AuthFetch } from "../interfaces/auth.fetch";
import { Api } from "./config.api";

export class AuthApi extends Api implements AuthFetch {
  private static instance: AuthApi | null = null;

  static getInstance(): AuthApi {
    if (this.instance === null) {
      this.instance = new AuthApi();
      return this.instance;
    }
    return this.instance;
  }
  login(userauth: UserAuth): Promise<Response> {
    const url: string = this.getUrl("auth/login");
    return fetch(url, this.fetchPostObject(userauth));
  }

  signup(newuserauth: RegisterUser): Promise<Response> {
    const url: string = this.getUrl("auth/signup");
    return fetch(url, this.fetchPostObject(newuserauth));
  }

  refreshAccessToken(token: string): Promise<Response> {
    const url: string = this.getUrl("auth/refresh");
    return fetch(url, this.fetchGetObjectWithtoken(token));
  }
}
