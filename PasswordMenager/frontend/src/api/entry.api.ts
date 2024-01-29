import { Api } from "./config.api";
import { EntryFetch } from "../interfaces/entry.fetch";

export class EntryApi extends Api implements EntryFetch {
  private static instance: EntryApi | null = null;

  static getInstance(): EntryApi {
    if (this.instance === null) {
      this.instance = new EntryApi();
      return this.instance;
    }
    return this.instance;
  }

  CreateNewEntry(newentry: CreateEntryDto, token: string): Promise<Response> {
    const url = this.getUrl("entry/create");
    return fetch(url, this.fetchPostObjectWithToken(newentry, token));
  }

  DeleteEntryById(entryid: string, accesstoken: string): Promise<Response> {
    const url = this.getUrl(`entry/byentityid/${entryid}`);
    return fetch(url, this.fetchDeleteObjectWithToken(accesstoken));
  }

  EditEntryByID(entrybody: EditEntry, accesstoken: string): Promise<Response> {
    const url = this.getUrl(`entry/edit`);
    return fetch(url, this.fetchPutObjectWithToken(entrybody, accesstoken));
  }

  getEntryById(entryId: string, accesstoken: string): Promise<Response> {
    const url = this.getUrl(`entry/${entryId}`);

    return fetch(url, this.fetchGetObjectWithtoken(accesstoken));
  }

  getEntryBy(accessToken: string, input?: EntryInput): Promise<Response> {
    const url = this.getUrl("entry/getby");
    const fetchObjet = this.fetchPostObjectWithToken(
      {
        page: input?.paginator.page,
        title: input?.title,
        groupId: input?.groupId,
      },
      accessToken
    );

    return fetch(url, fetchObjet);
  }

  getActiveEntryNotification(token: string): Promise<Response> {
    const url = this.getUrl("notification/numberOfEntryWithNotifications");
    return fetch(url, this.fetchGetObjectWithtoken(token));
  }

  getLastDeletedEntries(token: string): Promise<Response> {
    const url = this.getUrl("entry/lastDeleted");

    return fetch(url, this.fetchGetObjectWithtoken(token));
  }

  restoreEntry(token: string, restoreBody: RestoreEntryBody) {
    const url = this.getUrl("entry/restore");
    return fetch(url, this.fetchPostObjectWithToken(restoreBody, token));
  }
}
