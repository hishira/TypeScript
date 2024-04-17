import { Document } from 'mongoose';

export enum EventType {
  Create = 'CreateEvent',
  Delete = 'DeleteEvent',
  Update = 'UpdateEvent',
  Notify = 'NotifyEvent',
  Import = 'ImportRequestEvent',
  Export = 'ExportRequestEvent',
  Restore = 'RestoreEvent',
}
export interface IEvent extends Document {
  readonly _id: string;
  readonly created: Date;
  readonly eventType: EventType;
  readonly related_entity: string;
}
