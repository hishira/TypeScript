import { Types } from 'mongoose';
import {
  INotification,
  NotificationChannel,
} from 'src/schemas/Interfaces/notification.interface';

const NOTIFICATIONID = new Types.ObjectId(32);
const ENTRYID = new Types.ObjectId(32);
const USERID = new Types.ObjectId(32);
export const notificationMock = (
  iNotification?: INotification,
): INotification =>
  iNotification ??
  ({
    _id: NOTIFICATIONID,
    entryId: ENTRYID,
    notificationDate: new Date(Date.now()).toISOString(),
    notificationChannel: NotificationChannel.Email,
    active: true,
    userid: USERID,
  } as unknown as INotification);
export class NotificationMock {
  constructor(private data: INotification) {}

  save() {
    return Promise.resolve(notificationMock());
  }

  static find() {
    return {
      populate: (byWhat: string) => ({
        exec: () => Promise.resolve([notificationMock()]),
      }),
    };
  }

  static findOne() {
    return {
      exec: () => Promise.resolve(notificationMock()),
    };
  }

  static findOneAndUpdate(filter, setters, options) {
    return { exec: () => Promise.resolve(notificationMock()) };
  }

  static deleteOne() {
    return { exec: () => Promise.resolve(true) }; // tests
  }
}
