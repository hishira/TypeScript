import { Api } from "./config.api";

export class GroupApi extends Api {
  private static instance: GroupApi | null = null;

  static getInstance(): GroupApi {
    if (this.instance === null) {
      this.instance = new GroupApi();
      return this.instance;
    }
    return this.instance;
  }

  async getGroupByUser(token: string) {
    const url = this.getUrl("group/byuser");
    return await fetch(url, this.fetchGetObjectWithtoken(token));
  }

  async createGroup(createGroup: CreateGroup, token: string) {
    const url = this.getUrl("group/");
    return await fetch(url, this.fetchPostObjectWithToken(createGroup, token));
  }
}
