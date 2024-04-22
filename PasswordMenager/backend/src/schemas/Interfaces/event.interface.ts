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
export enum EntityType {
  User = 'User',
  Entry = 'Entry',
  Group = 'Group',
  ImportRequest = 'ImportRequest',
  History = 'History',
  Notification = 'Notification',
}
export interface IEvent extends Document {
  readonly created: Date;
  readonly eventType: EventType;
  readonly entityType: EntityType;
  readonly related_entity: string;
  readonly payloadObject: Record<string, unknown> | string | number;
}
