import { FilterQuery } from 'mongoose';
import { DeleteOption } from 'src/schemas/Interfaces/deleteoption.interface';
import { EntryState, IEntry } from 'src/schemas/Interfaces/entry.interface';
import { FilterOption } from 'src/schemas/Interfaces/filteroption.interface';
import { IsNotUndefined, isDefined } from 'src/utils/utils';

export class OptionModelBuilder {
  static readonly EMPTYOPTION = {
    getOption: (): Record<string, never> => ({}),
  };

  private filterQuery: FilterQuery<IEntry> = {};
  constructor(
    private option:
      | FilterOption<FilterQuery<IEntry>>
      | DeleteOption<FilterQuery<IEntry>> = OptionModelBuilder.EMPTYOPTION,
    private queryLimit: number = -1,
  ) {}

  updateStateEntry(state?: EntryState): this {
    this.filterQuery = {
      ...this.filterQuery,
      ...(isDefined(state) && { state: state }),
    };
    return this;
  }
  updateEntryId(entryId?: string): this {
    this.filterQuery = {
      ...this.filterQuery,
      ...(isDefined(entryId) && { _id: entryId }),
    };
    return this;
  }

  updateLimit(limit?: number): this {
    if (!isDefined(limit)) return this;
    this.queryLimit = limit;
    return this;
  }

  updateGroupId(groupId?: string): this {
    this.filterQuery = {
      ...this.filterQuery,
      ...(isDefined(groupId) && { groupid: groupId }),
    };
    return this;
  }

  updateGroupIdOrNull(groupId?: string): this {
    this.filterQuery = {
      ...this.filterQuery,
      ...(IsNotUndefined(groupId) && { groupid: groupId }),
    };
    return this;
  }

  updateUserIdOPtion(userid: string): this {
    this.filterQuery = {
      ...this.filterQuery,
      ...(isDefined(userid) && { userid: userid }),
    };
    return this;
  }

  updateTitle(title: string | undefined): this {
    if (title === undefined) return this;
    this.filterQuery = {
      ...this.filterQuery,
      title: { $regex: title },
    };
    return this;
  }

  setGroupIdNull(): this {
    this.filterQuery = {
      ...this.filterQuery,
      groupid: null,
    };
    return this;
  }

  getOption():
    | FilterOption<FilterQuery<IEntry>>
    | DeleteOption<FilterQuery<IEntry>> {
    return {
      getOption: (): FilterQuery<IEntry> => this.filterQuery,
      ...(this.queryLimit > 0 && { limit: this.queryLimit }),
    };
  }
}
