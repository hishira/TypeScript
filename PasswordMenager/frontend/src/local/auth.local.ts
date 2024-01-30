import { AuthFetch } from "../interfaces/auth.fetch";

export class AuthLocal implements AuthFetch {
  private static instance: AuthLocal | null = null;

  private constructor() {}
  static getInstance(): AuthLocal {
    if (this.instance === null) {
      this.instance = new AuthLocal();
    }
    return this.instance;
  }
  signup(newuserauth: RegisterUser): Promise<Response> {
    throw new Error("Method not implemented.");
  }
}
