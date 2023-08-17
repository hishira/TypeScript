import { Document, UpdateQuery, UpdateWithAggregationPipeline } from 'mongoose';
import { IGroupMeta } from './groupMeta.interface';

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
