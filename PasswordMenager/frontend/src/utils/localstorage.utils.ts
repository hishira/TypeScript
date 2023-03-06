export class SessionStorage {
  private static instance: SessionStorage | null = null;
  private storage: Storage;
  private readonly accesstoken = "accesstoken";
  private readonly refreshtoken = "refreshtoken";
  constructor() {
    this.storage = sessionStorage;
  }

  static getInstance(): SessionStorage {
    if (this.instance === null) {
      this.instance = new SessionStorage();
      return this.instance;
    }
    return this.instance;
  }
  getAccessToken(): string {
    return this.storage.getItem(this.accesstoken) || "";
  }

  getRefreshToken(): string {
    return this.storage.getItem("refreshtoken") || "";
  }

  setLocalStorageToken(token: AuthTokens): void {
    this.storage.setItem(this.accesstoken, token.access_token);
    this.storage.setItem(this.refreshtoken, token.refresh_token);
  }

  setAccessToken(accesstoken: string): void {
    this.storage.setItem(this.accesstoken, accesstoken);
  }

  removeStorage(): void {
    this.storage.removeItem(this.accesstoken);
    this.storage.removeItem(this.refreshtoken);
  }
}

const getAccessToken = (): string => localStorage.getItem("accesstoken") || "";
const getRefreshToken = (): string =>
  localStorage.getItem("refreshtoken") || "";
const setLocalStorageToken = (token: AuthTokens): void => {
  localStorage.setItem("accesstoken", token.access_token);
  localStorage.setItem("refreshtoken", token.refresh_token);
};

const setAccessToken = (accesstoken: string): void =>
  localStorage.setItem("accesstoken", accesstoken);
const removeStorage = (): void => {
  localStorage.removeItem("accesstoken");
  localStorage.removeItem("refreshtoken");
};

export {
  getAccessToken,
  getRefreshToken,
  setLocalStorageToken,
  removeStorage,
  setAccessToken,
};
