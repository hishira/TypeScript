import { EntryApi } from "../api/entry.api";
import { EntryFetch } from "../interfaces/entry.fetch";
import { EntryLocal } from "../local/entry.local";
import { AbstractFactory } from "./abstract.factory";

export class EntryFetchFactory extends AbstractFactory<EntryFetch> {
  private static instance: EntryFetchFactory | null = null;

  static getInstance(): EntryFetchFactory {
    if (this.instance === null) {
      this.instance = new EntryFetchFactory();
    }
    return this.instance;
  }
  getProperClass(): EntryFetch {
    return this.applicationDatabase?.isOnline
      ? EntryApi.getInstance()
      : EntryLocal.getInstance();
  }
}
