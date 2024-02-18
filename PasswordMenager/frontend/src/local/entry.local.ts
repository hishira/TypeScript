import { EntryFetch } from "../interfaces/entry.fetch";
import {
  DatabaseTypes,
  EntryValue,
} from "../local-database/localDatabase.interface";
import { DataBaseLocal } from "./database.local";
import { PaginatorData } from "./paginator";
import { LocalResponse } from "./response/auth.response";
import { GetEntryValue } from "./utils.local";

export class EntryLocal extends DataBaseLocal implements EntryFetch {
  private static instance: EntryLocal | null = null;
  private readonly defaultPerPage: number = 10;

  private constructor() {
    super();
  }
  static getInstance(): EntryLocal {
    if (this.instance === null) {
      this.instance = new EntryLocal();
    }
    return this.instance;
  }

  CreateNewEntry(newentry: CreateEntryDto, _: string): Promise<LocalResponse> {
    return this.getDatabase("entry")
      .add(GetEntryValue(newentry))
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
    const lastIndexItem = this.calculateLastIndexValueForSliceResult(
      response,
      page
    );
    const hasMoreItems =
      page * this.defaultPerPage + this.defaultPerPage < response.length;
    const respMapped = response
      .filter((entity) => (entity as EntryValue).groupid === groupId)
      .slice(page * this.defaultPerPage, lastIndexItem);
    return new LocalResponse(new PaginatorData(respMapped, page, hasMoreItems));
  }

  private calculateLastIndexValueForSliceResult(
    response: DatabaseTypes[],
    page: number
  ): number {
    return page * this.defaultPerPage + this.defaultPerPage < response.length
      ? page * this.defaultPerPage + this.defaultPerPage
      : response.length;
  }
}
