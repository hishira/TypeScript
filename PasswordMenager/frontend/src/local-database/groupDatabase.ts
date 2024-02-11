import { LocalDatabase } from "./lacalDatabase";
import { EntryValue } from "./localDatabase.interface";

export class GroupDatabase extends LocalDatabase {
  constructor() {
    super("group", 3);
  }

  override async add(groupDto: EntryValue) {
    this.baseAdd(groupDto);
  }
}
