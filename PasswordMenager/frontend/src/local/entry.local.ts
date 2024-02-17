import { EntryFetch } from "../interfaces/entry.fetch";
import {
  DatabaseTypes,
  EntryValue,
} from "../local-database/localDatabase.interface";
import { DataBaseLocal } from "./database.local";
import { PaginatorData } from "./paginator";
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
    const goupid = input?.groupId ?? null;
    return this.getDatabase("entry")
      .getAll()
      .then((resp) => this.calculatePaginator(resp, page, goupid));
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

  private calculatePaginator(
    response: DatabaseTypes[],
    page: number,
    groupId: string | null
  ): LocalResponse {
    const lastIndexItem =
      page * 10 + 10 < response.length ? page * 10 + 10 : response.length;
    const hasMoreItems = page * 10 + 10 < response.length;
    const respMapped = response
      .filter((entity) => (entity as EntryValue).groupid === groupId)
      .slice(page * 10, lastIndexItem);
    return new LocalResponse(new PaginatorData(respMapped, page, hasMoreItems));
  }
}
