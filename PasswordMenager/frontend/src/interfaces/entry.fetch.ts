export interface EntryFetch {
  CreateNewEntry(newentry: CreateEntryDto, token: string): Promise<Response>;
  DeleteEntryById(entryid: string, accesstoken: string): Promise<Response>;
  EditEntryByID(entrybody: EditEntry, accesstoken: string): Promise<Response>;
  getEntryById(entryId: string, accesstoken: string): Promise<Response>;
  getEntryBy(accessToken: string, input?: EntryInput): Promise<Response>;
  getActiveEntryNotification(token: string): Promise<Response>;
  getLastDeletedEntries(token: string): Promise<Response>;
  restoreEntry(token: string, restoreBody: RestoreEntryBody): Promise<Response>;
}
