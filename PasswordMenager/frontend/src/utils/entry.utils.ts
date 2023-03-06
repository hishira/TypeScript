import { EntryApi } from "../api/entry.api";
import { Auth } from "./auth.utils";
import { getAccessToken, SessionStorage } from "./localstorage.utils";
import { EMPTYENTRYRESPONSE } from "./constans.utils";

export class Entry {
  private static instance: Entry | null = null;
  private auth: Auth;
  private entryApi: EntryApi;
  private sessionStorage: SessionStorage;
  private readonly EMPTY = {
    status: false,
    response: EMPTYENTRYRESPONSE,
  };
  private readonly EMPTYGROUP = {
    status: false,
    response: [],
  };

  constructor(
    authInstance: Auth,
    entryApiInstance: EntryApi,
    sessionStorageInstance: SessionStorage
  ) {
    this.auth = authInstance;
    this.entryApi = entryApiInstance;
    this.sessionStorage = sessionStorageInstance;
  }
  static getInstance(): Entry {
    if (this.instance === null) {
      this.instance = new Entry(
        Auth.getInstance(),
        EntryApi.getInstance(),
        SessionStorage.getInstance()
      );
      return this.instance;
    }
    return this.instance;
  }
  async CreateEntry(
    newentry: CreateEntryDto,
    token: string
  ): Promise<IEntry | number> {
    const response = await this.entryApi
      .CreateNewEntry(newentry, token)
      .then((resp: Response) => {
        if (resp.status === 200 || resp.status === 201) return resp.json();
        return resp.status;
      });
    return response;
  }

  async CreateNewEntryUser(
    newentry: CreateEntryDto
  ): Promise<CreateEntryResponse> {
    let accesstoken: string = this.sessionStorage.getAccessToken();
    let response: number | IEntry = await this.CreateEntry(
      newentry,
      accesstoken
    );
    if (response === 401) {
      await this.auth.refreshToken();
      accesstoken = this.sessionStorage.getAccessToken();
      response = await this.CreateEntry(newentry, accesstoken);
      if (response === 401 || response === 500) {
        return this.EMPTY;
      }
    }
    if (typeof response !== "number")
      return { status: true, response: response };
    return this.EMPTY;
  }

  async GetEntries(
    groupid: GroupId,
    token: string
  ): Promise<number | Array<IEntry>> {
    const response = await this.entryApi
      .GetEntriesByGroupID(groupid, token)
      .then((resp: Response) => {
        if (resp.status === 200 || resp.status === 201) return resp.json();
        return resp.status;
      });
    return response;
  }

  async GetUserEntriesByGroupID(groupid: GroupId): Promise<GetEntriesResponse> {
    let accesstoken = this.sessionStorage.getAccessToken();
    let response: number | Array<IEntry> = await this.GetEntries(
      groupid,
      accesstoken
    );
    if (response === 401) {
      await this.auth.refreshToken();
      accesstoken = this.sessionStorage.getAccessToken();
      response = await this.GetEntries(groupid, accesstoken);
      if (response === 401 || response === 500) {
        return this.EMPTYGROUP;
      }
    } else if (response === 505) {
      return this.EMPTYGROUP;
    }
    if (typeof response !== "number")
      return { status: true, response: response };
    return this.EMPTYGROUP;
  }

  async DeleteEntry(
    deleteid: string,
    accesstoken: string
  ): Promise<DeleteEntryResponse> {
    const response = await this.entryApi
      .DeleteEntryById(deleteid, accesstoken)
      .then((resp: Response) => {
        return resp.json();
      });
    return response;
  }

  DeleteUserEntry = async (entryid: string): Promise<DeleteEntryResponse> => {
    let accesstoken = this.sessionStorage.getAccessToken();
    let response: DeleteEntryResponse = await this.DeleteEntry(
      entryid,
      accesstoken
    );
    if (response.status === false) {
      await this.auth.refreshToken();
      accesstoken = this.sessionStorage.getAccessToken();
      response = await this.DeleteEntry(entryid, accesstoken);
    }
    return response;
  };

  async EditEntry(
    editedbody: EditEntry,
    accesstoken: string
  ): Promise<EditEntryResponse> {
    const response: EditEntryResponse = await this.entryApi
      .EditEntryByID(editedbody, accesstoken)
      .then((resp: Response) => {
        return resp.json();
      });
    return response;
  }

  async EntryEditById(entrybody: EditEntry): Promise<EditEntryResponse> {
    let accesstoken = this.sessionStorage.getAccessToken();
    let response: EditEntryResponse = await this.EditEntry(
      entrybody,
      accesstoken
    );
    if (!response.status) {
      await this.auth.refreshToken();
      accesstoken = this.sessionStorage.getAccessToken();
      response = await this.EditEntry(entrybody, accesstoken);
    }
    return response;
  }
}
