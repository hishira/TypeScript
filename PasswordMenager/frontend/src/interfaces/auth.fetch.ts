export interface AuthFetch {
  login?(userauth: UserAuth): Promise<Response>;
  signup(newuserauth: RegisterUser): Promise<Response>;
  refreshAccessToken?(token: string): Promise<Response>;
}
