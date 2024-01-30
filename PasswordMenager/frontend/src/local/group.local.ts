import { GroupFetch } from "../interfaces/group.fetch";

export class GroupLocal implements GroupFetch {
  private static instance: GroupLocal | null = null;

  private constructor() {}
  static getInstance(): GroupLocal {
    if (this.instance === null) {
      this.instance = new GroupLocal();
    }
    return this.instance;
  }

  getGroupByUser(token: string): Promise<Response> {
    throw new Error("Method not implemented.");
  }
  createGroup(createGroup: CreateGroup, token: string): Promise<Response> {
    throw new Error("Method not implemented.");
  }
  deleteGroup(groupId: string, token: string): Promise<Response> {
    throw new Error("Method not implemented.");
  }
  editGroup(
    groupId: string,
    token: string,
    editGroup: { name: string }
  ): Promise<Response> {
    throw new Error("Method not implemented.");
  }
}
