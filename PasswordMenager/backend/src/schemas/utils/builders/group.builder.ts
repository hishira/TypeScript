import { UpdateQuery, UpdateWithAggregationPipeline } from 'mongoose';
import { IGroup } from 'src/schemas/Interfaces/group.interface';
import { MongoSetObject } from '../mongoSetObject';

export class GroupBuilder implements MongoSetObject<IGroup> {
  constructor(private entry: Partial<IGroup>) {}

  metaLastNameUpdate(lastName: string): this {
    this.entry = {
      ...this.entry,
      ...this.createMetaObject(lastName),
    } as unknown as Partial<IGroup>;
    return this;
  }

  getUpdateSetObject(): UpdateWithAggregationPipeline | UpdateQuery<IGroup> {
    return { $set: { ...this.entry } };
  }

  private createMetaObject(lastName: string): {
    'meta.lastName': string;
    'meta.editDate': Date;
  } {
    return {
      ['meta.lastName']: lastName,
      ['meta.editDate']: new Date(),
    };
  }
}
