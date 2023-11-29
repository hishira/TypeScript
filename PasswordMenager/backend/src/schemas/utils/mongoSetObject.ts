import { UpdateQuery, UpdateWithAggregationPipeline } from 'mongoose';

export interface MongoSetObject<T> {
  getUpdateSetObject(): UpdateQuery<T> | UpdateWithAggregationPipeline;
}
