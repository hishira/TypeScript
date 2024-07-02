export type LoginPayload = {
  username: string;
  password: string;
};

export type TokenResponse = {
  accessToken: string;
  refreshToken: string;
} | {error: string};
