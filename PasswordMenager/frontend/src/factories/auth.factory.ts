import { AuthApi } from "../api/auth.api";
import { AuthFetch } from "../interfaces/auth.fetch";
import { AuthLocal } from "../local/auth.local";
import { AbstractFactory } from "./abstract.factory";

export class AuthFetchFactory extends AbstractFactory<AuthFetch> {
  private static instance: AuthFetchFactory | null = null;

  private constructor() {
    super();
  }

  static getInstance(): AuthFetchFactory {
    if (this.instance === null) {
      this.instance = new AuthFetchFactory();
    }
    return this.instance;
  }

  getProperClass(): AuthFetch {
    return this.applicationDatabase?.isOnline
      ? AuthApi.getInstance()
      : AuthLocal.getInstance();
  }
}
