import { NotificationInput } from './NotificationInput.interface';

export class GetNotificationQuery {
  constructor(public readonly input: NotificationInput) {}
}
