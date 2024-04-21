import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { OnEvent } from '@nestjs/event-emitter';
import { Cron, CronExpression } from '@nestjs/schedule';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { CreateNotificationCommand } from 'src/commands/notification/CreateNotificationCommand';
import { DeleteNotificationCommand } from 'src/commands/notification/DeleteNotificationCommand';
import { EditNotificationCommand } from 'src/commands/notification/EditNotificationCommand';
import { CreateNotificationEvent } from 'src/events/createNotificationEvent';
import { EventTypes } from 'src/events/eventTypes';
import { GetNotificationQuery } from 'src/queries/notification/getNotification.queries';
import { IEntry } from 'src/schemas/Interfaces/entry.interface';
import { INotification } from 'src/schemas/Interfaces/notification.interface';
import {
  CreateNotificationDTO,
  CreateNotificationEmailDTO,
} from 'src/schemas/dto/createnotification.dto';
import { EditNotificationDTO } from 'src/schemas/dto/editnotification.dto';
import { NotificationUtils } from 'src/schemas/utils/Notification.utils';
import { Logger } from 'src/utils/Logger';
import { EmailSender } from 'src/utils/emailTransporter';
import {
  ErrorHandler,
  LogHandler,
  LoggerContext,
  LoggerHandler,
} from 'src/utils/error.handlers';

interface NotificationCron {
  notificationSendCronHandle(): void;
}

enum NotificationServiceMessages {
  Send = 'NotificationService; notificationSendCronHandle method',
  Create = 'NotificationService; createEmailNotification method',
  EmailNotificationSend = 'Email notification sedn',
  ErrorEmailNotificationSend = 'Error occus while email notification send',
}
@Injectable()
export class NotificationService implements NotificationCron, LoggerContext {
  logHandler: LoggerHandler = new LogHandler(this);
  errorHandler: LoggerHandler = new ErrorHandler(this);
  private emailSender: EmailSender;

  get activeNotification(): Promise<INotification[]> {
    return this.queryBus
      .execute(new GetNotificationQuery({ active: true }))
      .then((data) => NotificationUtils.GetDataFromPaginator(data));
  }

  constructor(
    readonly logger: Logger,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    this.emailSender = new EmailSender();
    this.logger.setContext('Notification service');
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  notificationSendCronHandle(): void {
    this.getActiveNotificationAsPromise()
      .then((promises) => Promise.all(promises))
      .catch((error) => {
        this.errorHandler.handle(
          'Problem with notification send',
          NotificationServiceMessages.Send,
        );
        return error;
      });
  }

  @OnEvent(EventTypes.CreateNotification, { async: true })
  eventNotificationCreateHandle(
    payload: CreateNotificationEvent,
  ): Promise<SMTPTransport.SentMessageInfo> {
    return this.createEmailNotification(
      payload.entry,
      payload.passwordExpireDate,
    );
  }
  private getActiveNotificationAsPromise(): Promise<
    Promise<boolean | SMTPTransport.SentMessageInfo>[]
  > {
    return this.activeNotification.then((notifications) => {
      return notifications.map((notification) => {
        if (NotificationUtils.SendNotification(notification)) {
          return this.notificationSend();
        }
        return Promise.resolve(true);
      });
    });
  }

  create(notificationDTO: CreateNotificationDTO): Promise<INotification> {
    return this.commandBus
      .execute(new CreateNotificationCommand(notificationDTO))
      .then((r) =>
        this.logHandler.handle(r, NotificationServiceMessages.Create),
      )
      .catch((error) =>
        this.errorHandler.handle(error, NotificationServiceMessages.Create),
      );
  }

  userNotification(userId: string): Promise<INotification[]> {
    return this.queryBus.execute(new GetNotificationQuery({ userId: userId }));
  }

  createEmailNotification(
    entry: IEntry,
    passwordExpireDate: Date | string,
  ): Promise<SMTPTransport.SentMessageInfo> {
    return this.create(
      new CreateNotificationEmailDTO(
        entry._id,
        passwordExpireDate,
        entry.userid as unknown as string,
      ),
    ).then(async (_) => {
      this.logHandler.handle(
        'Email notification create',
        NotificationServiceMessages.Create,
      );
      return this.notificationSend();
    });
  }

  notificationSend(): Promise<SMTPTransport.SentMessageInfo> {
    return this.emailSender
      .sendEmail('', '', 'You got message example')
      .then((r) =>
        this.logHandler.handle(
          r,
          NotificationServiceMessages.EmailNotificationSend,
        ),
      )
      .catch((error) =>
        this.errorHandler.handle(
          error,
          NotificationServiceMessages.ErrorEmailNotificationSend,
        ),
      );
  }

  checkAndSendNotification(): Promise<unknown> {
    return this.queryBus
      .execute(new GetNotificationQuery({}))
      .then((notification) => {
        const notifications =
          NotificationUtils.GetDataFromPaginator(notification);
        notifications.forEach((not) => {
          if (not.active) {
            this.notificationSend();
          }
        });
      });
  }

  deleteNotification(notificationId: string): Promise<INotification> {
    return this.commandBus
      .execute(new DeleteNotificationCommand({ _id: notificationId }))
      .then((response) =>
        this.logHandler.handle(
          response,
          'NotificationService; deleteNotification method',
        ),
      )
      .catch((error) =>
        this.errorHandler.handle(
          error,
          'NotificationService; deleteNotification method',
        ),
      );
  }

  editNotification(
    notificationBody: EditNotificationDTO,
  ): Promise<INotification> {
    return this.commandBus
      .execute(new EditNotificationCommand({ ...notificationBody }))
      .then((response) =>
        this.logHandler.handle(
          response,
          'NotificationService; editNotification method',
        ),
      )
      .catch((error) =>
        this.errorHandler.handle(
          error,
          'NotificationService; editNotification method',
        ),
      );
  }
}
