import { Injectable, Inject } from '@nestjs/common';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { FilterOption } from 'src/schemas/Interfaces/filteroption.interface';
import { INotification } from 'src/schemas/Interfaces/notification.interface';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { CreateNotificationDTO } from 'src/schemas/dto/createnotification.dto';
import { EmailSender } from 'src/utils/emailTransporter';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Logger } from 'src/utils/Logger';

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
    this.activeNotification.then(console.log)
  }

  create(notificationDTO: CreateNotificationDTO) {
    return this.notificationRepository.create(notificationDTO);
  }

  notificationSend(): Promise<SMTPTransport.SentMessageInfo> {
    return this.emailSender.sendEmail('', '', 'You got message example');
  }

  get activeNotification(): Promise<INotification[]> {
    return this.notificationRepository
      .find({
        getOption: () => ({ active: true }),
      })
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
