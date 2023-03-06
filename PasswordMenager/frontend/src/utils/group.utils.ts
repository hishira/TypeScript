import { GroupApi } from "../api/group.api";
import { Auth } from "./auth.utils";
import { getAccessToken } from "./localstorage.utils";
import { EMPTYGROUPRESPONSE } from "./constans.utils";

export class Group {
  private static instance: Group | null = null;
  private auth: Auth;
  private groupApi: GroupApi;

  constructor(authInstance: Auth, groupApiInstance: GroupApi) {
    this.auth = authInstance;
    this.groupApi = groupApiInstance;
  }

  static getInstance(): Group {
    if (this.instance === null) {
      this.instance = new Group(Auth.getInstance(), GroupApi.getInstance());
      return this.instance;
    }
    return this.instance;
  }

  async GetGroups(token: string): Promise<number | Array<IGroup>> {
    const response: Promise<number | Array<IGroup>> = await this.groupApi
      .getGroupByUser(token)
      .then((resp: Response) => {
        if (resp.status === 201 || resp.status === 200) return resp.json();
        return resp.status;
      });
    return response;
  }

  async GetGroupsByUser(): Promise<GroupResponse> {
    let token: string = getAccessToken();
    let response: number | Array<IGroup> = await this.GetGroups(token);
    if (response === 401) {
      await this.auth.refreshToken();
      token = getAccessToken();
      response = await this.GetGroups(token);
      if (response === 401 || response === 500) {
        return { status: false, response: [] };
      }
    } else if (response === 500) {
      return { status: false, response: [] };
    }
    if (typeof response !== "number")
      return { status: true, response: response };
    return { status: false, response: [] };
  }

  async GroupCreate(
    creategroup: CreateGroup,
    accesstoken: string
  ): Promise<number | IGroup> {
    const response = await this.groupApi
      .createGroup(creategroup, accesstoken)
      .then((resp: Response) => {
        if (resp.status === 200 || resp.status === 201) return resp.json();
        return resp.status;
      });
    return response;
  }

  async CreateGroupForUser(
    creategroup: CreateGroup
  ): Promise<CreateGroupResponse> {
    let accesstoken: string = getAccessToken();
    let response: number | IGroup = await this.GroupCreate(
      creategroup,
      accesstoken
    );
    if (response === 401) {
      await this.auth.refreshToken();
      accesstoken = getAccessToken();
      response = await this.GroupCreate(creategroup, accesstoken);
      if (response === 401 || response === 500) {
        return { status: false, response: EMPTYGROUPRESPONSE };
      }
    } else if (response === 500) {
      return { status: false, response: EMPTYGROUPRESPONSE };
    }
    if (typeof response !== "number")
      return { status: true, response: response };
    return { status: false, response: EMPTYGROUPRESPONSE };
  }
}
