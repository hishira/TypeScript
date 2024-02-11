import { GroupFetch } from "../interfaces/group.fetch";
import { GroupValue } from "../local-database/localDatabase.interface";
import { DataBaseLocal } from "./database.local";
import { LocalResponse } from "./response/auth.response";

export class GroupLocal extends DataBaseLocal implements GroupFetch {
  private static instance: GroupLocal | null = null;
  static getInstance(): GroupLocal {
    if (this.instance === null) {
      this.instance = new GroupLocal();
    }
    return this.instance;
  }

  getGroupByUser(token: string): Promise<LocalResponse> {
    return Promise.resolve(new LocalResponse([])); //throw new Error("Method not implemented.");
  }
  createGroup(createGroup: CreateGroup, token: string): Promise<LocalResponse> {
    const newGroup: GroupValue = {
      name: createGroup.name,
      id: crypto.randomUUID(),
      userid: "", // TODO: Fix @hishira
    };
    return this.getDatabase("group")
      .add(newGroup)
      .then((databaseReponse) => new LocalResponse(databaseReponse));
  }
  deleteGroup(groupId: string, token: string): Promise<LocalResponse> {
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
