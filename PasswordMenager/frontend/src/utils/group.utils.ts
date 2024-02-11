import { GroupFetchFactory } from "../factories/group.factory";
import { GroupFetch } from "../interfaces/group.fetch";
import { Auth } from "./auth.utils";
import { EMPTYGROUPRESPONSE } from "./constans.utils";
import { SessionStorage } from "./localstorage.utils";

export class Group {
  private static instance: Group | null = null;
  private auth: Auth;
  private sessionStorage: SessionStorage;
  private groupApi: GroupFetch;

  private constructor(
    authInstance: Auth,
    sessionStorageInstance: SessionStorage
  ) {
    this.auth = authInstance;
    this.groupApi = GroupFetchFactory.getInstance().getProperClass();
    this.sessionStorage = sessionStorageInstance;
  }

  static getInstance(): Group {
    if (this.instance === null) {
      this.instance = new Group(
        Auth.getInstance(),
        SessionStorage.getInstance()
      );
      return this.instance;
    }
    return this.instance;
  }

  getGroups(token: string): Promise<number | IGroup[]> {
    return this.groupApi.getGroupByUser(token).then((resp: Response) => {
      if (resp.status === 201 || resp.status === 200) return resp.json();
      return resp.status;
    });
  }
  async mapGroupsResponse(
    response: number | Array<IGroup>
  ): Promise<GroupResponse> {
    if (response === 401) {
      await this.auth.refreshToken();
      const token = this.sessionStorage.getAccessToken();
      response = await this.getGroups(token);
      if (response === 401 || response === 500) {
        return { status: false, response: [] };
      }
    } else if (response === 500) {
      return { status: false, response: [] };
    }

    return {
      status: true,
      response: typeof response === "number" ? [] : response,
    };
  }
  async GetGroups(token: string): Promise<GroupResponse> {
    return await this.getGroups(token).then(this.mapGroupsResponse);
  }

  async GetGroupsByUser(): Promise<GroupResponse> {
    let token: string = this.sessionStorage.getAccessToken();
    return this.GetGroups(token);
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
    let accesstoken: string = this.sessionStorage.getAccessToken();
    let response: number | IGroup = await this.GroupCreate(
      creategroup,
      accesstoken
    );
    if (response === 401) {
      await this.auth.refreshToken();
      accesstoken = this.sessionStorage.getAccessToken();
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

  DeleteGroup(groupId: string, token: string): Promise<Response> {
    return this.groupApi.deleteGroup(groupId, token);
  }

  DeleteUserGroup(groupId: string): Promise<unknown> {
    let accessToken: string = this.sessionStorage.getAccessToken();
    return this.DeleteGroup(groupId, accessToken)
      .then(async (response) => {
        if (response.status === 401) {
          await this.auth.refreshToken();
          const token = this.sessionStorage.getAccessToken();
          return this.DeleteGroup(groupId, token);
        }
        return response;
      })
      .then((resp) => resp.json());
  }

  EditGroup(
    groupId: string,
    token: string,
    groupDto: { name: string }
  ): Promise<Response> {
    return this.groupApi.editGroup(groupId, token, groupDto);
  }

  EditUserGroup(groupId: string, groupDto: { name: string }): Promise<unknown> {
    let accessToken = this.sessionStorage.getAccessToken();
    return this.EditGroup(groupId, accessToken, groupDto)
      .then(async (response) => {
        if (response.status === 401) {
          await this.auth.refreshToken();
          const token = this.sessionStorage.getAccessToken();
          return this.EditGroup(groupId, token, groupDto);
        }

        return response;
      })
      .then((resp) => resp.json());
  }
}
