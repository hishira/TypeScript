import { FilterQuery } from 'mongoose';
import { DeleteOption } from 'src/schemas/Interfaces/deleteoption.interface';
import { FilterOption } from 'src/schemas/Interfaces/filteroption.interface';
import { IGroup } from 'src/schemas/Interfaces/group.interface';

export type Option<T> = FilterOption<T> | DeleteOption<T>;
export class GroupOptionBuilder {
  constructor(private option: FilterQuery<IGroup> = {}) {}

  updateUserId(userid: string): this {
    this.option = {
      ...this.option,
      userid: userid,
    };
    return this;
  }

  updateId(groupid: string): this {
    this.option = {
      ...this.option,
      _id: groupid,
    };
    return this;
  }

  getOption(): Option<FilterQuery<IGroup>> {
    return {
      getOption: () => this.option,
    };
  }
}
