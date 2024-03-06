import { Types } from 'mongoose';
import {
  INotification,
  NotificationChannel,
} from 'src/schemas/Interfaces/notification.interface';
export const notificationMock = (
  iNotification?: INotification,
): INotification =>
  iNotification ??
  ({
    _id: new Types.ObjectId(32),
    entryId: new Types.ObjectId(32),
    notificationDate: new Date(Date.now()).toISOString(),
    notificationChannel: NotificationChannel.Email,
    active: true,
    userid: new Types.ObjectId(32),
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
