import { LocalDatabase } from "./lacalDatabase";
import { EntryValue } from "./localDatabase.interface";

export class EntryDatabase extends LocalDatabase {
  constructor() {
    super("entry", 2);
  }

  override async add(entryDto: EntryValue) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.baseAdd(entryDto);
        resolve(entryDto);
      } catch (e) {
        reject(e);
      }
    });
    
  }
}
