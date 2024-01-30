import { GroupApi } from "../api/group.api";
import { GroupFetch } from "../interfaces/group.fetch";
import { GroupLocal } from "../local/group.local";
import { AbstractFactory } from "./abstract.factory";

export class GroupFetchFactory extends AbstractFactory<GroupFetch> {
  private static instance: GroupFetchFactory | null = null;

  private constructor() {
    super();
  }
  static getInstance(): GroupFetchFactory {
    if (this.instance === null) {
      this.instance = new GroupFetchFactory();
    }
    return this.instance;
  }
  getProperClass(): GroupFetch {
    return this.applicationDatabase?.isOnline
      ? GroupApi.getInstance()
      : GroupLocal.getInstance();
  }
}
