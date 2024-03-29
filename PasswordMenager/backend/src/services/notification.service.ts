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

interface NotificationCron {
  notificationSendCronHandle(): void;
}
@Injectable()
export class NotificationService implements NotificationCron {
  private emailSender: EmailSender;

  get activeNotification(): Promise<INotification[]> {
    return this.queryBus
      .execute(new GetNotificationQuery({ active: true }))
      .then((data) => NotificationUtils.GetDataFromPaginator(data));
  }

  constructor(
    private readonly logger: Logger,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    this.emailSender = new EmailSender();
    this.logger.setContext('Notification service');
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  notificationSendCronHandle() {
    this.getActiveNotificationAsPromise()
      .then((promises) => Promise.all(promises))
      .catch(() => this.logger.error('Problem with notification send'));
  }

  @OnEvent(EventTypes.CreateNotification, { async: true })
  eventNotificationCreateHandle(payload: CreateNotificationEvent) {
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

  create(notificationDTO: CreateNotificationDTO) {
    return this.commandBus.execute(
      new CreateNotificationCommand(notificationDTO),
    );
  }

  userNotification(userId: string) {
    return this.queryBus.execute(new GetNotificationQuery({ userId: userId }));
  }

  createEmailNotification(entry: IEntry, passwordExpireDate: Date | string) {
    return this.create(
      new CreateNotificationEmailDTO(
        entry._id,
        passwordExpireDate,
        entry.userid as unknown as string,
      ),
    ).then(async (_) => {
      this.logger.logMessage(
        `Notification created for date ${passwordExpireDate}`,
      );
      return this.notificationSend();
    });
  }

  notificationSend(): Promise<SMTPTransport.SentMessageInfo> {
    return this.emailSender.sendEmail('', '', 'You got message example');
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

  deleteNotification(notificationId: string) {
    return this.commandBus.execute(
      new DeleteNotificationCommand({ _id: notificationId }),
    );
  }

  editNotification(notificationBody: EditNotificationDTO) {
    return this.commandBus.execute(
      new EditNotificationCommand({ ...notificationBody }),
    );
  }
}
