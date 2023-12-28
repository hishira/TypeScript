import { ObjectId } from 'mongoose';
import { NotificationChannel } from 'src/schemas/Interfaces/notification.interface';

export class NotificationCommandInput {
  public readonly id?: string | ObjectId;
  public readonly notificationData?: string;
  public readonly notificationChannel?: NotificationChannel;
  public readonly active?: boolean;
}
