import { EntryFetch } from "../interfaces/entry.fetch";

export class EntryLocal implements EntryFetch {
  private static instance: EntryLocal | null = null;

  static getInstance(): EntryLocal {
    if (this.instance === null) {
      this.instance = new EntryLocal();
      return this.instance;
    }
    return this.instance;
  }

  CreateNewEntry(newentry: CreateEntryDto, token: string): Promise<Response> {
    throw new Error("Method not implemented.");
  }
  DeleteEntryById(entryid: string, accesstoken: string): Promise<Response> {
    throw new Error("Method not implemented.");
  }
  EditEntryByID(entrybody: EditEntry, accesstoken: string): Promise<Response> {
    throw new Error("Method not implemented.");
  }
  getEntryById(entryId: string, accesstoken: string): Promise<Response> {
    throw new Error("Method not implemented.");
  }
  getEntryBy(
    accessToken: string,
    input?: EntryInput | undefined
  ): Promise<Response> {
    throw new Error("Method not implemented.");
  }
  getActiveEntryNotification(token: string): Promise<Response> {
    throw new Error("Method not implemented.");
  }
  getLastDeletedEntries(token: string): Promise<Response> {
    throw new Error("Method not implemented.");
  }
  restoreEntry(
    token: string,
    restoreBody: RestoreEntryBody
  ): Promise<Response> {
    throw new Error("Method not implemented.");
  }
}
