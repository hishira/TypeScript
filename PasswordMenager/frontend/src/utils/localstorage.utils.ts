export class SessionStorage {
  private static instance: SessionStorage | null = null;
  private storage: Storage;
  private readonly accesstoken = "accesstoken";
  private readonly refreshtoken = "refreshtoken";
  private constructor() {
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
