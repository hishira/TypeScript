import { EntryApi } from "../api/entry.api";
import { Auth } from "./auth.utils";
import { getAccessToken } from "./localstorage.utils";
import { EMPTYENTRYRESPONSE } from "./constans.utils";

export class Entry {
  private static instance: Entry | null = null;

  static getInstance(): Entry {
    if (this.instance === null) {
      this.instance = new Entry();
      return this.instance;
    }
    return this.instance;
  }
  async CreateEntry(
    newentry: CreateEntryDto,
    token: string
  ): Promise<IEntry | number> {
    const response = await EntryApi.getInstance()
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
    let accesstoken: string = getAccessToken();
    let response: number | IEntry = await this.CreateEntry(
      newentry,
      accesstoken
    );
    if (response === 401) {
      await Auth.getInstance().refreshToken();
      accesstoken = getAccessToken();
      response = await this.CreateEntry(newentry, accesstoken);
      if (response === 401) {
        return {
          status: false,
          response: EMPTYENTRYRESPONSE,
        };
      } else if (response === 500) {
        return {
          status: false,
          response: EMPTYENTRYRESPONSE,
        };
      }
    }
    if (typeof response !== "number")
      return { status: true, response: response };
    return {
      status: false,
      response: EMPTYENTRYRESPONSE,
    };
  }

  async GetEntries(
    groupid: GroupId,
    token: string
  ): Promise<number | Array<IEntry>> {
    const response = await EntryApi.getInstance()
      .GetEntriesByGroupID(groupid, token)
      .then((resp: Response) => {
        if (resp.status === 200 || resp.status === 201) return resp.json();
        return resp.status;
      });
    return response;
  }

  async GetUserEntriesByGroupID(groupid: GroupId): Promise<GetEntriesResponse> {
    let accesstoken = getAccessToken();
    let response: number | Array<IEntry> = await this.GetEntries(
      groupid,
      accesstoken
    );
    if (response === 401) {
      await Auth.getInstance().refreshToken();
      accesstoken = getAccessToken();
      response = await this.GetEntries(groupid, accesstoken);
      if (response === 401) {
        return { status: false, response: [] };
      } else if (response === 500) {
        return { status: false, response: [] };
      }
    } else if (response === 505) {
      return { status: false, response: [] };
    }
    if (typeof response !== "number")
      return { status: true, response: response };
    return { status: false, response: [] };
  }

  async DeleteEntry(
    deleteid: string,
    accesstoken: string
  ): Promise<DeleteEntryResponse> {
    const response = await EntryApi.getInstance()
      .DeleteEntryById(deleteid, accesstoken)
      .then((resp: Response) => {
        return resp.json();
      });
    return response;
  }

  DeleteUserEntry = async (entryid: string): Promise<DeleteEntryResponse> => {
    let accesstoken = getAccessToken();
    let response: DeleteEntryResponse = await this.DeleteEntry(
      entryid,
      accesstoken
    );
    if (response.status === false) {
      await Auth.getInstance().refreshToken();
      accesstoken = getAccessToken();
      response = await this.DeleteEntry(entryid, accesstoken);
    }
    return response;
  };

  async EditEntry(
    editedbody: EditEntry,
    accesstoken: string
  ): Promise<EditEntryResponse> {
    const response: EditEntryResponse = await EntryApi.getInstance()
      .EditEntryByID(editedbody, accesstoken)
      .then((resp: Response) => {
        return resp.json();
      });
    return response;
  }

  async EntryEditById(entrybody: EditEntry): Promise<EditEntryResponse> {
    let accesstoken = getAccessToken();
    let response: EditEntryResponse = await this.EditEntry(
      entrybody,
      accesstoken
    );
    if (!response.status) {
      await Auth.getInstance().refreshToken();
      accesstoken = getAccessToken();
      response = await this.EditEntry(entrybody, accesstoken);
    }
    return response;
  }
}
