import { Api } from "./config.api";

export class EntryApi extends Api {
  private static instance: EntryApi | null = null;

  static getInstance(): EntryApi {
    if (this.instance === null) {
      this.instance = new EntryApi();
      return this.instance;
    }
    return this.instance;
  }

  async CreateNewEntry(
    newentry: CreateEntryDto,
    token: string
  ): Promise<Response> {
    const url = this.getUrl("entry");
    return await fetch(url, this.fetchPostObjectWithToken(newentry, token));
  }

  async GetEntriesByGroupID(
    groupid: GroupId,
    token: string
  ): Promise<Response> {
    const url = this.getUrl(`entry/bygroup/${groupid.id}`);
    return await fetch(url, this.fetchGetObjectWithtoken(token));
  }

  async DeleteEntryById(
    entryid: string,
    accesstoken: string
  ): Promise<Response> {
    const url = this.getUrl(`entry/byentityid/${entryid}`);
    return await fetch(url, this.fetchDeleteObjectWithToken(accesstoken));
  }

  async EditEntryByID(
    entrybody: EditEntry,
    accesstoken: string
  ): Promise<Response> {
    const url = this.getUrl(`entry/edit`);
    return await fetch(
      url,
      this.fetchPutObjectWithToken(entrybody, accesstoken)
    );
  }
}
