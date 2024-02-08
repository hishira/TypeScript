import { LocalDatabase } from "./lacalDatabase";

export class EntryDatabase extends LocalDatabase {
  constructor() {
    super("entry",2);
  }

  override async add(entryDto: { id: string }) {
    this.baseAdd(entryDto);
  }
}
