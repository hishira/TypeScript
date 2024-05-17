import { EntryState } from 'src/schemas/Interfaces/entry.interface';
import { EntryQueryInput } from './EntryQueryInput.interface';

export class GetSpecificEntry {
  constructor(public readonly input: EntryQueryInput) {}
}

export const DefaultDeleteSpecificEntry = (userid: string): GetSpecificEntry =>
  new GetSpecificEntry({
    userId: userid,
    entryState: EntryState.DELETED,
    limit: 10,
  });
