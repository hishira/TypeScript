import { IMeta } from './meta.interface';
export enum LastEditedVariable {
  LASTNOTE = 'lastNote',
  LASTPASSWORD = 'lastPassword',
  LASTTITLE = 'lastTitle',
  LASTUSERNAME = 'lastUsername',
}

export interface IEntryMeta extends IMeta {
  readonly lastTitle: string;
  readonly lastUsername: string;
  readonly lastPassword: string;
  readonly lastNote: string;
  readonly lastEditedVariable: LastEditedVariable;
}
