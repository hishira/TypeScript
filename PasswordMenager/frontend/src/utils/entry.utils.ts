import { EntryApi } from "../api/entry.api";
import { Auth } from "./auth.utils";
import { SessionStorage } from "./localstorage.utils";
import { EMPTYENTRYRESPONSE } from "./constans.utils";
import { EntryPaginator } from "../components/Paginator";

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
    return this.CreateEntry(newentry, accesstoken)
      .then(async (response) => {
        if (response === 401) {
          await this.auth.refreshToken();
          accesstoken = this.sessionStorage.getAccessToken();
          //TODO: Can ref
          return this.CreateEntry(newentry, accesstoken);
        }
        return response;
      })
      .then((response) => {
        if (response === 401 || response === 500) {
          return this.EMPTY;
        }
        if (typeof response !== "number")
          return { status: true, response: response };
        return this.EMPTY;
      });
  }

  async GetEntries(
    groupid: GroupId,
    token: string
  ): Promise<number | Array<IEntry>> {
    return this.entryApi
      .GetEntriesByGroupID(groupid, token)
      .then((resp: Response) => {
        if (resp.status === 200 || resp.status === 201) return resp.json();
        return resp.status;
      });
  }

  async GetUserEntriesByGroupID(groupid: GroupId): Promise<GetEntriesResponse> {
    let accesstoken = this.sessionStorage.getAccessToken();
    return this.GetEntries(groupid, accesstoken).then(async (response) =>
      this.UserEntriesResponseHandler(groupid, response)
    );
  }

  private async UserEntriesResponseHandler(
    groupid: GroupId,
    response: number | IEntry[]
  ) {
    if (response === 401) {
      await this.auth.refreshToken();
      let accesstoken = this.sessionStorage.getAccessToken();
      response = await this.GetEntries(groupid, accesstoken);
      if (response === 401 || response === 500) {
        return this.EMPTYGROUP;
      }
    } else if (response === 505) {
      return this.EMPTYGROUP;
    }
    if (typeof response !== "number")
      return {
        status: true,
        response: response.map((resp) => ({
          ...resp,
          passwordExpiredDate: resp.passwordExpiredDate?.split("T")[0],
        })),
      };
    return this.EMPTYGROUP;
  }

  async DeleteEntry(
    deleteid: string,
    accesstoken: string
  ): Promise<DeleteEntryResponse> {
    return this.entryApi
      .DeleteEntryById(deleteid, accesstoken)
      .then((resp: Response) => resp.json());
  }

  async DeleteUserEntry(entryid: string): Promise<DeleteEntryResponse> {
    let accesstoken = this.sessionStorage.getAccessToken();
    return this.DeleteEntry(entryid, accesstoken).then(async (response) => {
      if (response.status === false) {
        await this.auth.refreshToken();
        accesstoken = this.sessionStorage.getAccessToken();
        return this.DeleteEntry(entryid, accesstoken);
      }
      return response;
    });
  }

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
    return this.EditEntry(entrybody, accesstoken).then(async (response) => {
      if (!response.status) {
        await this.auth.refreshToken();
        accesstoken = this.sessionStorage.getAccessToken();
        return this.EditEntry(entrybody, accesstoken);
      }
      return response;
    });
  }

  async getEntryById(entryId: string): Promise<IEntry> {
    let accessToken = this.sessionStorage.getAccessToken();
    let response = await this.entryApi
      .getEntryById(entryId, accessToken)
      .then(async (resp) => {
        if (!resp.ok) {
          await this.auth.refreshToken();
          accessToken = this.sessionStorage.getAccessToken();
          return this.entryApi.getEntryById(entryId, accessToken);
        }
        return resp;
      })
      .then((resp) => resp.json())
      .then((resp) => ({
        ...resp,
        passwordExpiredDate: resp.passwordExpiredDate?.split("T")[0],
      }))
      .catch((_) => console.error(_));
    return response;
  }

  // TODO: Refactor

  async getEntryWithoutGroup(
    accessToken: string,
    paginator: EntryPaginator
  ): Promise<IEntry[] | number | { data: IEntry[]; pageInfo: any }> {
    return this.entryApi
      .getEntryWithoutGroup(accessToken, paginator)
      .then((resp) => (resp.status === 401 ? 401 : resp.json()));
  }

  async EntriesWithoutGroup(paginator: EntryPaginator): Promise<{
    data: IEntry[];
    pageInfo: { hasMore: boolean; items: number; page: number };
  }> {
    const accessToken = this.sessionStorage.getAccessToken();

    return this.getEntryWithoutGroup(accessToken, paginator).then(
      async (resp) => {
        if (typeof resp === "number" && resp === 401) {
          await this.auth.refreshToken();
          const token = this.sessionStorage.getAccessToken();
          return this.getEntryWithoutGroup(token, paginator).then((value) => {
            if (Array.isArray(value)) {
              return value.map((entry) => ({
                ...entry,
                passwordExpiredDate:
                  entry?.passwordExpiredDate?.split("T")[0] ?? "",
              }));
            }
            return Array.isArray(value)
              ? { data: value, pageInfo: null }
              : {
                  data: (value as any)?.data,
                  pageInfo: (value as any).pageInfo,
                };
          });
        }
        const responseMapped = Array.isArray(resp)
          ? resp
          : typeof resp === "object" && "data" in resp
          ? resp.data
          : resp;
        const pageInfo =
          typeof resp === "object" && "pageInfo" in resp ? resp.pageInfo : null;
        const mappedData = Array.isArray(responseMapped)
          ? responseMapped.map((entry: IEntry) => ({
              ...entry,
              passwordExpiredDate:
                entry?.passwordExpiredDate?.split("T")[0] ?? "",
            }))
          : typeof resp === "number"
          ? []
          : resp;
        return {
          data: mappedData,
          pageInfo: pageInfo,
        };
      }
    );
  }
}
