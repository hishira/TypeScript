import { Document } from 'mongoose';
export enum EventAction {
  Create = 'Create',
}
export enum EventType {
  Create = 'CreateEvent',
  Delete = 'DeleteEvent',
  Update = 'UpdateEvent',
  Notify = 'NotifyEvent',
  Import = 'ImportRequestEvent',
  ActivateImport = 'ActivateImportRequestEvent',
  Export = 'ExportRequestEvent',
  Restore = 'RestoreEvent',
  Login = 'Login',
  Register = 'Register',
  MultiDelete = 'MultiDelete',
  MultiUpdate = 'MultiUpdate',
  MultiCreate = 'MultiCreate',
  EntityHistoryAppend = 'EntityHistoryAppend',
  GroupHistoryAppend = 'GroupHistoryAppend',
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
  readonly payloadObject:
    | Record<string, unknown>
    | string
    | number
    | Document
    | Document[];
}
