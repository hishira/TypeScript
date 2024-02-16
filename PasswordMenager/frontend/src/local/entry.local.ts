import { EntryFetch } from "../interfaces/entry.fetch";
import { EntryValue } from "../local-database/localDatabase.interface";
import { DataBaseLocal } from "./database.local";
import { LocalResponse } from "./response/auth.response";

export class EntryLocal extends DataBaseLocal implements EntryFetch {
  private static instance: EntryLocal | null = null;
  private readonly defaultPerPage: number = 10;
  static getInstance(): EntryLocal {
    if (this.instance === null) {
      this.instance = new EntryLocal();
    }
    return this.instance;
  }

  CreateNewEntry(newentry: CreateEntryDto, _: string): Promise<LocalResponse> {
    const newEntry = {
      ...newentry,
      groupid: newentry.groupid === "" ? null : newentry.groupid,
      _id: crypto.randomUUID(),
    };
    return this.getDatabase("entry")
      .add(newEntry)
      .then((newEntryResponse) => new LocalResponse(newEntryResponse));
  }
  DeleteEntryById(entryid: string, _: string): Promise<LocalResponse> {
    return this.getDatabase("entry")
      .baseDelete(entryid)
      .then((resp) => new LocalResponse({ status: true, resp }));
  }
  EditEntryByID(entrybody: EditEntry, _: string): Promise<LocalResponse> {
    return this.getDatabase("entry")
      .put(entrybody as EntryValue)
      .then((resp) => new LocalResponse({ status: true, resp }));
  }
  getEntryById(entryId: string, _: string): Promise<LocalResponse> {
    return this.getDatabase("entry")
      .getById(entryId)
      .then((resp) => new LocalResponse(resp));
  }
  getEntryBy(
    _: string,
    input?: EntryInput | undefined
  ): Promise<LocalResponse> {
    const page = input?.paginator?.page ?? 0;
    return this.getDatabase("entry")
      .getAll()
      .then((resp) => {
        const lastIndexItem =
          page * 10 + 10 < resp.length ? page * 10 + 10 : resp.length;
        const respMapped = resp.slice(page * 10, lastIndexItem);
        console.log(input, respMapped, resp.length);
        return new LocalResponse({
          data: respMapped,
          pageInfo: {
            items: respMapped.length,
            hasMore: respMapped.length >= 10,
            page,
          },
        });
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
