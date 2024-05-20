import { MockResponse } from "../local/response/auth.response";

export interface AuthFetch {
  login?(userauth: UserAuth): Promise<MockResponse>;
  signup(newuserauth: RegisterUser): Promise<MockResponse>;
  refreshAccessToken?(token: string): Promise<MockResponse>;
}
