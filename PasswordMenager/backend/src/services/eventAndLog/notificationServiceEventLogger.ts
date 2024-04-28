import { EventEmitter2 } from '@nestjs/event-emitter';
import { EventAction } from 'src/schemas/Interfaces/event.interface';
import { EditNotificationDTO } from 'src/schemas/dto/editnotification.dto';
import { NotificationEventBuilder } from 'src/schemas/utils/builders/event/notificationEvent.builder';
import { LoggerHandler } from 'src/utils/error.handlers';
import { NotificationServiceMessages } from '../notification.service';

export class NotificationServiceEventLogger {
  constructor(
    private readonly logHandler: LoggerHandler,
    private readonly errorHandler: LoggerHandler,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  createSuccess<T extends { _id: string }>(notification: T): T {
    this.logHandler.handle(notification, NotificationServiceMessages.Create);
    this.eventEmitter.emitAsync(
      EventAction.Create,
      new NotificationEventBuilder(notification._id, notification)
        .setCreateEvent()
        .build(),
    );
    return notification;
  }

  createError<T>(error: T): T {
    this.errorHandler.handle(error, NotificationServiceMessages.Create);
    this.eventEmitter.emitAsync(
      EventAction.Create,
      new NotificationEventBuilder(null, error).setCreateEvent().build(),
    );
    return error;
  }

  createEmailNotification(): void {
    this.logHandler.handle(
      'Email notification create',
      NotificationServiceMessages.Create,
    );
  }

  notificationSendSuccess<T>(response: T): T {
    this.logHandler.handle(
      response,
      NotificationServiceMessages.EmailNotificationSend,
    );
    return response;
  }

  notificationSendError<T>(error: T): T {
    this.errorHandler.handle(
      error,
      NotificationServiceMessages.EmailNotificationSend,
    );
    return error;
  }

  deleteNotifcationSuccess<T>(notificationId: string, response: T): T {
    this.logHandler.handle(
      response,
      'NotificationService; deleteNotification method',
    );
    this.eventEmitter.emitAsync(
      EventAction.Create,
      new NotificationEventBuilder(notificationId, response)
        .setDeleteEvent()
        .build(),
    );

    return response;
  }

  deleteNotifcationError<T>(notificationId: string, error: T): T {
    this.errorHandler.handle(
      error,
      'NotificationService; deleteNotification method',
    );
    this.eventEmitter.emitAsync(
      EventAction.Create,
      new NotificationEventBuilder(notificationId, null)
        .setDeleteEvent()
        .build(),
    );

    return error;
  }

  editNotifcationSuccess<T>(
    notificationBody: EditNotificationDTO,
    response: T,
  ): T {
    this.logHandler.handle(
      response,
      'NotificationService; editNotification method',
    );
    this.eventEmitter.emitAsync(
      EventAction.Create,
      new NotificationEventBuilder(notificationBody._id, notificationBody)
        .setEditEvent()
        .build(),
    );

    return response;
  }

  editNotifcationError<T>(notificationBody: EditNotificationDTO, error: T): T {
    this.errorHandler.handle(
      error,
      'NotificationService; editNotification method',
    );
    this.eventEmitter.emitAsync(
      EventAction.Create,
      new NotificationEventBuilder(notificationBody._id, null)
        .setEditEvent()
        .build(),
    );

    return error;
  }

  notificationSendCronError<T>(error: T): T {
    this.errorHandler.handle(
      'Problem with notification send',
      NotificationServiceMessages.Send,
    );

    return error;
  }
}
