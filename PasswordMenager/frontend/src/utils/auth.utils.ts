import { AuthApi } from "../api/auth.api";
import { getRefreshToken, setAccessToken } from "./localstorage.utils";

export class Auth {
  private static instance: Auth | null = null;

  static getInstance(): Auth {
    if (this.instance === null) {
      this.instance = new Auth();
      return this.instance;
    }
    return this.instance;
  }

  async LoginUser(authinfo: UserAuth): Promise<AuthTokens | any> {
    return await AuthApi.getInstance()
      .login(authinfo)
      .then((resp: Response) => {
        return resp.json();
      });
  }

  async LoginUserHandle(authobj: UserAuth): Promise<LoginReponse> {
    const response: AuthTokens = await this.LoginUser(authobj);

    if (response?.access_token !== "" && response?.refresh_token !== "") {
      return { status: true, response: response };
    }
    return { status: false, response: response };
  }

  async registerUser(signupinfo: UserAuth): Promise<null | object | boolean> {
    const response: boolean | object = await AuthApi.getInstance()
      .signup(signupinfo)
      .then((resp: Response) => {
        if (resp.status === 200 || resp.status === 201) return resp.json();
        return false;
      });
    return response === false ? null : response;
  }

  async refreshToken(): Promise<void> {
    const refreshtoken: string = getRefreshToken();
    const response: number | AccessToken = await AuthApi.getInstance()
      .refreshAccessToken(refreshtoken)
      .then((resp: Response) => {
        if (resp.status === 201 || resp.status === 200) return resp.json();
        return 401;
      });
    if ((response as AccessToken).access_token !== "") {
      setAccessToken((response as AccessToken).access_token);
    }
  }
}
