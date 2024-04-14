import { Document } from 'mongoose';
export enum EventType {
  Create = 'Create',
  Delete = 'Delete',
  Update = 'Update',
  Notify = 'Notify',
}
export interface IEvent extends Document {
  readonly _id: string;
  readonly created: Date;
  readonly eventType: EventType;
  readonly related_entity: string;
}
