import { LocalDatabase } from "./lacalDatabase";
import { EntryValue } from "./localDatabase.interface";

export class EntryDatabase extends LocalDatabase {
  constructor() {
    super("entry", 2);
  }

  override async add(entryDto: EntryValue) {
    this.baseAdd(entryDto);
  }
}
