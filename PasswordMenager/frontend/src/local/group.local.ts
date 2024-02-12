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

  getGroupByUser(_: string): Promise<LocalResponse> {
    return this.getDatabase("group")
      .getAll()
      .then((groupResponse) => new LocalResponse(groupResponse));
  }
  createGroup(createGroup: CreateGroup, _: string): Promise<LocalResponse> {
    const newGroup: GroupValue = {
      name: createGroup.name,
      _id: crypto.randomUUID(),
      userid: "", // TODO: Fix @hishira -> if we have one user it is not required
    };
    return this.getDatabase("group")
      .add(newGroup)
      .then((databaseReponse) => new LocalResponse(databaseReponse));
  }
  deleteGroup(groupId: string, _: string): Promise<LocalResponse> {
    throw new Error("Method not implemented.");
  }
  editGroup(
    groupId: string,
    _: string,
    editGroup: { name: string }
  ): Promise<Response> {
    throw new Error("Method not implemented.");
  }
}
