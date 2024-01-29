import { ApplicationDatabase } from "../models/applicationDatabase";

export abstract class AbstractFactory<T> {
  protected applicationDatabase: ApplicationDatabase | null = null;
  protected constructor() {
    this.applicationDatabase = ApplicationDatabase.getInstance();
  }
  abstract getProperClass(): T;
}
