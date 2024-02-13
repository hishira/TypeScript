import { EntryFetch } from "../interfaces/entry.fetch";
import { LocalDatabases } from "../local-database/init";
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

  CreateNewEntry(newentry: CreateEntryDto, _: string): Promise<LocalResponse> {
    const newEntry = {
      ...newentry,
      _id: crypto.randomUUID(),
    };
    return this.getDatabase("entry")
      .add(newEntry)
      .then((newEntryResponse) => {
        console.log("RE ", newEntryResponse);
        return new LocalResponse(newEntryResponse);
      });
  }
  DeleteEntryById(entryid: string, _: string): Promise<LocalResponse> {
    return LocalDatabases.getInstance()
      .getDatabase("entry")
      .baseDelete(entryid)
      .then((resp) => new LocalResponse({ status: true, resp }));
  }
  EditEntryByID(entrybody: EditEntry, _: string): Promise<LocalResponse> {
    throw new Error("Method not implemented.");
  }
  getEntryById(entryId: string, _: string): Promise<LocalResponse> {
    throw new Error("Method not implemented.");
  }
  getEntryBy(
    _: string,
    input?: EntryInput | undefined
  ): Promise<LocalResponse> {
    return this.getDatabase("entry")
      .getAll()
      .then((resp) => {
        console.log(resp);
        return new LocalResponse(resp);
      });
  }
  getActiveEntryNotification(_: string): Promise<LocalResponse> {
    throw new Error("Method not implemented.");
  }
  getLastDeletedEntries(_: string): Promise<LocalResponse> {
    throw new Error("Method not implemented.");
  }
  restoreEntry(
    _: string,
    restoreBody: RestoreEntryBody
  ): Promise<LocalResponse> {
    throw new Error("Method not implemented.");
  }
}
