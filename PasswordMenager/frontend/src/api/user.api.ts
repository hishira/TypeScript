import { Api } from "./config.api";

export class UserApi extends Api {
  private static instance: UserApi | null = null;

  static getInstace(): UserApi {
    if (this.instance === null) {
      this.instance = new UserApi();

      return this.instance;
    }
    return this.instance;
  }

  getUserInfo(token: string) {
    const url = this.getUrl("users/userinfo");

    return fetch(url, this.fetchGetObjectWithtoken(token));
  }
}
