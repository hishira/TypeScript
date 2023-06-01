import { randomUUID } from "./uuid.utils";

export const generateMockAuthTokens = (): AuthTokens => ({
  access_token: randomUUID(),
  refresh_token: randomUUID(),
});
