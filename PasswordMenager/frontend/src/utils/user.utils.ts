import { UserApi } from "../api/user.api";
import { SessionStorage } from "./localstorage.utils";

export class User {
  private static instance: User | null = null;

  private constructor(
    private readonly user: UserApi,
    private readonly sessionStorage: SessionStorage
  ) {}

  static getInstance(): User {
    if (this.instance === null) {
      this.instance = new User(
        UserApi.getInstace(),
        SessionStorage.getInstance()
      );

      return this.instance;
    }
    return this.instance;
  }

  getUserInfo(): Promise<IUser> {
    const token = this.sessionStorage.getAccessToken();
    return this.user.getUserInfo(token).then((data) => data.json());
  }

  updateUser(user: UserUpdate): Promise<Response> {
    const token = this.sessionStorage.getAccessToken();
    return this.user.updateUserInfo(token, user);
  }
}
