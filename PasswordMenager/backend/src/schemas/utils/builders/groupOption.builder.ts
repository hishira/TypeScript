import { FilterQuery } from 'mongoose';
import { DeleteOption } from 'src/schemas/Interfaces/deleteoption.interface';
import { FilterOption } from 'src/schemas/Interfaces/filteroption.interface';
import { IGroup } from 'src/schemas/Interfaces/group.interface';
import { isDefined } from 'src/utils/utils';

export type Option<T> = FilterOption<T> | DeleteOption<T>;
export class GroupOptionBuilder {
  constructor(private option: FilterQuery<IGroup> = {}) {}

  updateUserId(userid?: string): this {
    this.option = {
      ...this.option,
      ...(isDefined(userid) && { userid: userid }),
    };
    return this;
  }

  updateId(groupid?: string): this {
    this.option = {
      ...this.option,
      ...(isDefined(groupid) && { _id: groupid }),
    };
    return this;
  }

  getOption(): Option<FilterQuery<IGroup>> {
    return {
      getOption: () => this.option,
    };
  }
}
