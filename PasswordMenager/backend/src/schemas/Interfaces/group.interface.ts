import { Document, UpdateQuery, UpdateWithAggregationPipeline } from 'mongoose';
import { IGroupMeta } from './groupMeta.interface';
import { CreateGroupDto } from '../dto/group.dto';
import { DTO } from '../dto/object.interface';
import { FilterQuery } from 'mongoose';
import { FilterOption } from './filteroption.interface';
import { DeleteOption } from './deleteoption.interface';
import { GroupNotExists } from 'src/errors/GroupNotExists.error';

export interface IGroup extends Document {
  readonly name: string;
  readonly userid: string;
  readonly meta: IGroupMeta;
}

interface MongoSetObject<T> {
  getUpdateSetObject(): UpdateQuery<T> | UpdateWithAggregationPipeline;
}
export class GroupBuilder implements MongoSetObject<IGroup> {
  constructor(private entry: Partial<IGroup>) {}

  metaLastNameUpdate(lastName: string): this {
    this.entry = {
      ...this.entry,
      ['meta.lastName']: lastName,
    } as unknown as Partial<IGroup>;
    return this;
  }

  getUpdateSetObject(): UpdateWithAggregationPipeline | UpdateQuery<IGroup> {
    return { $set: { ...this.entry } };
  }
}

type Option<T> = FilterOption<T> | DeleteOption<T>;
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
type Optional<T> = T | undefined | null;
export class GroupDtoMapper {
  static CreatePureGroupDTO(
    userid: string,
    groupcreateDTO: CreateGroupDto,
  ): DTO {
    return new (class implements DTO {
      toObject() {
        return {
          ...groupcreateDTO,
          userid: userid,
        };
      }
    })();
  }
}

export class GroupUtils {
  static EmptyGroupGuard(group: Optional<IGroup>): IGroup {
    if (group === null || group === undefined) throw new GroupNotExists();
    return group;
  }
}
