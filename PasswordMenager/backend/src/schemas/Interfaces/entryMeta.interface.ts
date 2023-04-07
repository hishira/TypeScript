import { IMeta } from './meta.interface';

export interface IEntryMeta extends IMeta {
  readonly lastTitle: string;
  readonly lastUsername: string;
  readonly lastPassword: string;
  readonly lastNote: string;
}
