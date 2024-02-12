import { LocalDatabase } from "./lacalDatabase";
import { GroupValue } from "./localDatabase.interface";

export class GroupDatabase extends LocalDatabase {
  constructor() {
    super("group", 3);
  }

  override async add(groupDto: GroupValue) {
    this.baseAdd(groupDto);
  }
}
