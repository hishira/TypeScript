import { EntryFetchFactory } from "../factories/entry.factory";
import { EntryFetch } from "../interfaces/entry.fetch";
import { Auth } from "./auth.utils";
import { EMPTYENTRYRESPONSE } from "./constans.utils";
import {
  ResponseJsonRun,
  isObjectAndHasProperKeys,
  retriveKeyFromObjectIfExists,
} from "./helpers.utils";
import { SessionStorage } from "./localstorage.utils";

export class Entry {
  private static instance: Entry | null = null;
  private auth: Auth;
  private entryApi: EntryFetch;
  private sessionStorage: SessionStorage;
  private readonly EMPTY = {
    status: false,
    response: EMPTYENTRYRESPONSE,
  };

  private constructor(
    authInstance: Auth,
    sessionStorageInstance: SessionStorage
  ) {
    this.auth = authInstance;
    this.entryApi = EntryFetchFactory.getInstance().getProperClass();
    this.sessionStorage = sessionStorageInstance;
  }
  static getInstance(): Entry {
    if (this.instance === null) {
      this.instance = new Entry(
        Auth.getInstance(),
        SessionStorage.getInstance()
      );
      return this.instance;
    }
    return this.instance;
  }

  private responseJsonOrStatus(resp: Response) {
    if (resp.status === 200 || resp.status === 201) return resp.json();
    return resp.status;
  }

  async CreateEntry(
    newentry: CreateEntryDto,
    token: string
  ): Promise<IEntry | number> {
    const response = await this.entryApi
      .CreateNewEntry(newentry, token)
      .then((resp: Response) => this.responseJsonOrStatus(resp));
    return response;
  }

  async CreateNewEntryUser(
    newentry: CreateEntryDto
  ): Promise<CreateEntryResponse> {
    let accesstoken: string = this.sessionStorage.getAccessToken();
    return this.CreateEntry(newentry, accesstoken)
      .then(async (response) => this.unauthorizedCheck(newentry, response))
      .then((response) => this.serverErrorOrEmptyCheck(response));
  }

  async DeleteEntry(
    deleteid: string,
    accesstoken: string
  ): Promise<DeleteEntryResponse> {
    return this.entryApi
      .DeleteEntryById(deleteid, accesstoken)
      .then(ResponseJsonRun);
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
      .then(ResponseJsonRun);
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
      .then(ResponseJsonRun)
      .catch((_) => console.error(_));
    return response;
  }

  getNumberOfActiveNotification() {
    const accessToken = this.sessionStorage.getAccessToken();
    return this.entryApi
      .getActiveEntryNotification(accessToken)
      .then(ResponseJsonRun);
  }

  getLastDeletedEntries(): Promise<EntryData> {
    return this.entryApi
      .getLastDeletedEntries(this.sessionStorage.getAccessToken())
      .then(ResponseJsonRun);
  }

  restoreEntry(restoreBody: RestoreEntryBody) {
    const accessToken = this.sessionStorage.getAccessToken();
    return this.entryApi
      .restoreEntry(accessToken, restoreBody)
      .then(ResponseJsonRun);
  }
  async getEntryBy(
    accessToken: string,
    input: EntryInput
  ): Promise<IEntry[] | number | { data: IEntry[]; pageInfo: any }> {
    return this.entryApi
      .getEntryBy(accessToken, input)
      .then((resp) => (resp.status === 401 ? 401 : resp.json()));
  }

  private async refreshEntriesBy(input: EntryInput) {
    await this.auth.refreshToken();
    const token = this.sessionStorage.getAccessToken();
    return this.getEntryBy(token, input).then((value) =>
      this.retriveDataFromResponse(value)
    );
  }

  private retriveDataFromResponse(response: unknown): {
    data: Record<string, unknown>;
    pageInfo: Record<string, unknown>;
  } {
    return Array.isArray(response)
      ? { data: response, pageInfo: null }
      : {
          data: (response as any)?.data,
          pageInfo: (response as any).pageInfo,
        };
  }

  private responseMappedObject(resp: any): IEntry[] {
    if (Array.isArray(resp)) return resp;
    return this.getProperKeyDataFromResponse(resp);
  }

  private getProperKeyDataFromResponse(resp: any) {
    return isObjectAndHasProperKeys(resp, "data") ? resp.data : resp;
  }
  async GetEntriesBy(input: EntryInput): Promise<{
    data: IEntry[];
    pageInfo: PaginatorType;
  }> {
    const accessToken = this.sessionStorage.getAccessToken();

    return this.getEntryBy(accessToken, input).then(async (resp) => {
      if (typeof resp === "number") {
        this.refreshEntriesBy(input);
      }
      const responseMapped: IEntry[] = this.responseMappedObject(resp);
      const pageInfo = this.retrivePageInfoFromObject(
        resp as Record<string, any>
      );

      return {
        data: responseMapped,
        pageInfo: pageInfo,
      };
    });
  }

  private retrivePageInfoFromObject(resp: { pageInfo?: any }): PaginatorType {
    return retriveKeyFromObjectIfExists(resp, "pageInfo") as PaginatorType;
  }

  private async unauthorizedCheck(
    newentry: CreateEntryDto,
    response: number | IEntry
  ) {
    if (response === 401) {
      await this.auth.refreshToken();
      let accesstoken = this.sessionStorage.getAccessToken();
      return this.CreateEntry(newentry, accesstoken);
    }
    return response;
  }

  private serverErrorOrEmptyCheck(response: number | IEntry) {
    if (response === 401 || response === 500) {
      return this.EMPTY;
    }
    if (typeof response !== "number")
      return { status: true, response: response };
    return this.EMPTY;
  }
}
