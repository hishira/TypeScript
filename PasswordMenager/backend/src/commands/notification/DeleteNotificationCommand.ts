import { NotificationCommandInput } from './NotificationCommandInput';

export class DeleteNotificationCommand {
  constructor(
    public readonly deleteNotificationInput: NotificationCommandInput,
  ) {}
}
