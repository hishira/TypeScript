export type BackendResponse<T> = T | {error: string} 
export type LoginPayload = {
  username: string;
  password: string;
};

export type TokenResponse = BackendResponse<{
  accessToken: string;
  refreshToken: string;
}>;

export type AccessTokeResponse = BackendResponse<{
  accessToken: string,
}>
