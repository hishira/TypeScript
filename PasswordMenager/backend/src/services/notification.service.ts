import { Injectable, Inject } from '@nestjs/common';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { FilterOption } from 'src/schemas/Interfaces/filteroption.interface';
import {
  ActiveNotificationFilter,
  INotification,
  NotificationChannel,
} from 'src/schemas/Interfaces/notification.interface';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import {
  CreateNotificationDTO,
  CreateNotificationEmailDTO,
} from 'src/schemas/dto/createnotification.dto';
import { EmailSender } from 'src/utils/emailTransporter';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Logger } from 'src/utils/Logger';
import { IEntry } from 'src/schemas/Interfaces/entry.interface';

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
      .then(console.log)
      .catch(() => this.logger.error('Problem with notification send'));
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

  createEmailNotification(entry: IEntry, passwordExpireDate: Date) {
    return this.create(
      new CreateNotificationEmailDTO(entry._id, passwordExpireDate),
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
