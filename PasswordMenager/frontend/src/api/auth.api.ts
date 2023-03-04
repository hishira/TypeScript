import { Api } from "./config.api";

export class AuthApi extends Api {
  private static instance: AuthApi | null = null;

  static getInstance(): AuthApi {
    if (this.instance === null) {
      this.instance = new AuthApi();
      return this.instance;
    }
    return this.instance;
  }
  async login(userauth: UserAuth): Promise<Response> {
    const url: string = this.getUrl("auth/login");
    return await fetch(url, this.fetchPostObject(userauth));
  }

  async signup(newuserauth: UserAuth): Promise<Response> {
    const url: string = this.getUrl("auth/signup");
    return await fetch(url, this.fetchPostObject(newuserauth));
  }

  async refreshAccessToken(token: string): Promise<Response> {
    const url: string = this.getUrl("auth/refresh");
    return await fetch(url, this.fetchGetObjectWithtoken(token));
  }
}
