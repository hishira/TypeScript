import { Types } from 'mongoose';
import {
  INotification,
  NotificationChannel,
} from 'src/schemas/Interfaces/notification.interface';
import { Executable } from './EntryMock';

const NOTIFICATIONID = new Types.ObjectId(32);
const ENTRYID = new Types.ObjectId(32);
const USERID = new Types.ObjectId(32);
const NOTIFICATIONDATE = new Date(Date.now()).toISOString();
export const notificationMock = (
  iNotification?: INotification,
): INotification =>
  iNotification ??
  ({
    _id: NOTIFICATIONID,
    entryId: ENTRYID,
    notificationDate: NOTIFICATIONDATE,
    notificationChannel: NotificationChannel.Email,
    active: true,
    userid: USERID,
  } as unknown as INotification);
export class NotificationMock {
  constructor(private data: INotification) {}

  save(): Promise<INotification> {
    return Promise.resolve(notificationMock());
  }

  static find(): {
    populate: (value: string) => Executable<Promise<INotification[]>>;
  } {
    return {
      populate: (byWhat: string): Executable<Promise<INotification[]>> => ({
        exec: (): Promise<INotification[]> =>
          Promise.resolve([notificationMock()]),
      }),
    };
  }

  static findOne(): Executable<Promise<INotification>> {
    return {
      exec: (): Promise<INotification> => Promise.resolve(notificationMock()),
    };
  }

  static findOneAndUpdate(
    filter,
    setters,
    options,
  ): Executable<Promise<INotification>> {
    return {
      exec: (): Promise<INotification> => Promise.resolve(notificationMock()),
    };
  }

  static findOneAndDelete(options) {
    return {
      exec: () => Promise.resolve(notificationMock()),
    };
  }

  static deleteOne(): Executable<Promise<true>> {
    return { exec: (): Promise<true> => Promise.resolve(true) }; // tests
  }
}
