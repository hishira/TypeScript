import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Cron, CronExpression } from '@nestjs/schedule';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { IEntry } from 'src/schemas/Interfaces/entry.interface';
import { FilterOption } from 'src/schemas/Interfaces/filteroption.interface';
import {
  ActiveNotificationFilter,
  INotification,
  UserActiveNotificationFilter,
} from 'src/schemas/Interfaces/notification.interface';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import {
  CreateNotificationDTO,
  CreateNotificationEmailDTO,
} from 'src/schemas/dto/createnotification.dto';
import { Logger } from 'src/utils/Logger';
import { EmailSender } from 'src/utils/emailTransporter';

interface NotificationCron {
  notificationSendCronHandle(): void;
}
@Injectable()
export class NotificationService implements NotificationCron {
  private emailSender: EmailSender;
  private allNotifiaction: FilterOption<unknown> = { getOption: () => ({}) };
  constructor(
    @Inject(Repository)
    private readonly notificationRepository: Repository<INotification>,
    private readonly logger: Logger,
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

  @OnEvent('notification.create', { async: true })
  eventNotificationCreateHandle(payload: {
    passwordExpireDate: Date;
    entry: IEntry;
    userid: string;
  }) {
    return this.createEmailNotification(
      payload.entry,
      payload.passwordExpireDate,
      payload.userid,
    );
  }
  getActiveNotificationAsPromise(): Promise<
    Promise<boolean | SMTPTransport.SentMessageInfo>[]
  > {
    return this.activeNotification.then((notifications) => {
      return notifications.map((notification) => {
        if (
          notification.active &&
          notification.notificationDate < new Date(Date.now())
        ) {
          return this.notificationSend();
        }
        return Promise.resolve(true);
      });
    });
  }

  create(notificationDTO: CreateNotificationDTO) {
    return this.notificationRepository.create(notificationDTO);
  }

  userNotification(userId: string) {
    return this.notificationRepository.find(
      new UserActiveNotificationFilter(userId),
    );
  }

  createEmailNotification(
    entry: IEntry,
    passwordExpireDate: Date,
    userid: string,
  ) {
    return this.create(
      new CreateNotificationEmailDTO(entry._id, passwordExpireDate, userid),
    ).then(async () => {
      this.logger.logMessage(
        `Notification created for date ${passwordExpireDate}`,
      );
      return this.notificationSend();
    });
  }

  notificationSend(): Promise<SMTPTransport.SentMessageInfo> {
    return this.emailSender.sendEmail('', '', 'You got message example');
  }

  get activeNotification(): Promise<INotification[]> {
    return this.notificationRepository
      .find(new ActiveNotificationFilter())
      .then((data) => (Array.isArray(data) ? data : data.data));
  }
  checkAndSendNotification(): Promise<unknown> {
    return this.notificationRepository
      .find(this.allNotifiaction)
      .then((notification) => {
        const notifications = Array.isArray(notification)
          ? notification
          : notification.data;
        notifications.forEach((not) => {
          if (not.active) {
            this.notificationSend();
          }
        });
      });
  }
}
