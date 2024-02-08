import { EntryDatabase } from "./entryDatabase";
import { LocalDatabase } from "./lacalDatabase";
import { UserDatabase } from "./userDatabase";
type SingletonTypeOfDatabase = LocalDatabase;
export const databases: SingletonTypeOfDatabase[] = [
  new UserDatabase(),
  new EntryDatabase(),
];
