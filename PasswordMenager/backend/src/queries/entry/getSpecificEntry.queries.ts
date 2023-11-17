import { EntryQueryInput } from './EntryQueryInput.interface';

export class GetSpecificEntry {
  constructor(public readonly input: EntryQueryInput) {}
}
