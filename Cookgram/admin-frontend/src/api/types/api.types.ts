export type ErrorResponse = { error: string };

export type BackendResponse<T> = T | ErrorResponse;

export type LoginPayload = {
  readonly username: string;
  readonly password: string;
};

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export type TokenResponse = BackendResponse<Tokens>;

export type AccessTokeResponse = BackendResponse<{
  accessToken: string;
}>;
