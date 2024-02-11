import { EntryDatabase } from "./entryDatabase";
import { GroupDatabase } from "./groupDatabase";
import { LocalDatabase } from "./lacalDatabase";
import { UserDatabase } from "./userDatabase";
type SingletonTypeOfDatabase = LocalDatabase;
export const databases: SingletonTypeOfDatabase[] = [
  new UserDatabase(),
  new EntryDatabase(),
  new GroupDatabase(),
];
