import { GroupFetch } from "../interfaces/group.fetch";
import { GroupValue } from "../local-database/localDatabase.interface";
import { DataBaseLocal } from "./database.local";
import { LocalResponse } from "./response/auth.response";

const GetGroupValue = (
  groupId: string,
  editGroup: { name: string }
): GroupValue => ({
  _id: groupId,
  name: editGroup.name,
});

const GetLocalResponseByCommingResponse = <T>(response: T): LocalResponse =>
  new LocalResponse(response);

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
      .then(GetLocalResponseByCommingResponse);
  }
  createGroup(createGroup: CreateGroup, _: string): Promise<LocalResponse> {
    const newGroup: GroupValue = {
      name: createGroup.name,
      _id: crypto.randomUUID(),
    };

    return this.getDatabase("group")
      .add(newGroup)
      .then(GetLocalResponseByCommingResponse);
  }
  deleteGroup(groupId: string, _: string): Promise<LocalResponse> {
    return this.getDatabase("group")
      .baseDelete(groupId)
      .then(GetLocalResponseByCommingResponse);
  }
  editGroup(
    groupId: string,
    _: string,
    editGroup: { name: string }
  ): Promise<LocalResponse> {
    return this.getDatabase("group")
      .put(GetGroupValue(groupId, editGroup))
      .then(GetLocalResponseByCommingResponse);
  }
}
