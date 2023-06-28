import { IMeta } from './meta.interface';
export enum LastEditedVariable {
  LASTNOTE = 'note',
  LASTPASSWORD = 'password',
  LASTTITLE = 'title',
  LASTUSERNAME = 'username',
  LASTEMAIL = 'email',
  LASTURL = 'url',
}

export interface IEntryMeta extends IMeta {
  readonly lastTitle: string;
  readonly lastUsername: string;
  readonly lastPassword: string;
  readonly lastNote: string;
  readonly lastEmail: string;
  readonly lastUrl: string;
  readonly lastEditedVariable: LastEditedVariable;
}
