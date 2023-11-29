import { FilterQuery } from 'mongoose';
import { EntryState, IEntry } from '../Interfaces/entry.interface';
import { FilterOption } from '../Interfaces/filteroption.interface';

export class ActiveEntryFilter {
  constructor(
    private readonly option: FilterOption<FilterQuery<IEntry>>,
    public readonly state: EntryState = EntryState.ACTIVE,
  ) {}

  public Filter(): FilterQuery<IEntry> {
    const hasState = 'state' in this.option.getOption();
    return {
      ...this.option.getOption(),
      ...(!hasState && { state: this.state }),
    };
  }
}
