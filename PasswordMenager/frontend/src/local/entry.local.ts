import { EntryFetch } from "../interfaces/entry.fetch";
import { DataBaseLocal } from "./database.local";
import { LocalResponse } from "./response/auth.response";

export class EntryLocal extends DataBaseLocal implements EntryFetch {
  private static instance: EntryLocal | null = null;

  static getInstance(): EntryLocal {
    if (this.instance === null) {
      this.instance = new EntryLocal();
    }
    return this.instance;
  }

  CreateNewEntry(
    newentry: CreateEntryDto,
    token: string
  ): Promise<LocalResponse> {
    return this.getDatabase("entry")
      .add(newentry)
      .then((newEntryResponse) => new LocalResponse(newEntryResponse));
  }
  DeleteEntryById(
    entryid: string,
    accesstoken: string
  ): Promise<LocalResponse> {
    throw new Error("Method not implemented.");
  }
  EditEntryByID(
    entrybody: EditEntry,
    accesstoken: string
  ): Promise<LocalResponse> {
    throw new Error("Method not implemented.");
  }
  getEntryById(entryId: string, accesstoken: string): Promise<LocalResponse> {
    throw new Error("Method not implemented.");
  }
  getEntryBy(
    accessToken: string,
    input?: EntryInput | undefined
  ): Promise<LocalResponse> {
    return Promise.resolve(new LocalResponse([]));
  }
  getActiveEntryNotification(token: string): Promise<LocalResponse> {
    throw new Error("Method not implemented.");
  }
  getLastDeletedEntries(token: string): Promise<LocalResponse> {
    throw new Error("Method not implemented.");
  }
  restoreEntry(
    token: string,
    restoreBody: RestoreEntryBody
  ): Promise<LocalResponse> {
    throw new Error("Method not implemented.");
  }
}
