export type BackendResponse<T> = T | { error: string };

export type LoginPayload = {
  readonly username: string;
  readonly password: string;
};

export type TokenResponse = BackendResponse<{
  accessToken: string;
  refreshToken: string;
}>;

export type AccessTokeResponse = BackendResponse<{
  accessToken: string;
}>;
