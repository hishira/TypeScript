import { GroupFetch } from "../interfaces/group.fetch";
import { Api } from "./config.api";

export class GroupApi extends Api implements GroupFetch {
  private static instance: GroupApi | null = null;

  static getInstance(): GroupApi {
    if (this.instance === null) {
      this.instance = new GroupApi();
      return this.instance;
    }
    return this.instance;
  }

  getGroupByUser(token: string) {
    const url = this.getUrl("group/byuser");
    return fetch(url, this.fetchGetObjectWithtoken(token));
  }

  createGroup(createGroup: CreateGroup, token: string) {
    const url = this.getUrl("group/");
    return fetch(url, this.fetchPostObjectWithToken(createGroup, token));
  }

  deleteGroup(groupId: string, token: string) {
    const url = this.getUrl(`group/${groupId}`);
    return fetch(url, this.fetchDeleteObjectWithToken(token));
  }

  editGroup(groupId: string, token: string, editGroup: { name: string }) {
    const url = this.getUrl(`group/${groupId}`);
    return fetch(url, this.fetchPutObjectWithToken(editGroup, token));
  }
}
