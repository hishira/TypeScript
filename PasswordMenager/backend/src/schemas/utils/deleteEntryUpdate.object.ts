import { AnyKeys, AnyObject } from 'mongoose';
import { EntryState, IEntry } from '../Interfaces/entry.interface';

type EntryUpdateSet = AnyKeys<IEntry> & AnyObject;
export class DeleteEntryUpdate {
  constructor(
    public $set: EntryUpdateSet = {
      state: EntryState.DELETED,
      ['meta.deleteDate']: Date.now(),
    },
  ) {}
}
