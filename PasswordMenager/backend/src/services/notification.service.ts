import { Injectable, Inject } from '@nestjs/common';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { FilterOption } from 'src/schemas/Interfaces/filteroption.interface';
import { INotification } from 'src/schemas/Interfaces/notification.interface';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { CreateNotificationDTO } from 'src/schemas/dto/createnotification.dto';
import { EmailSender } from 'src/utils/emailTransporter';

@Injectable()
export class NotificationService {
  private emailSender: EmailSender;
  private allNotifiaction: FilterOption<unknown> = { getOption: () => ({}) };
  constructor(
    @Inject(Repository)
    private readonly notificationRepository: Repository<INotification>,
  ) {
    this.emailSender = new EmailSender();
  }

  create(notificationDTO: CreateNotificationDTO) {
    return this.notificationRepository.create(notificationDTO);
  }

  notificationSend(): Promise<SMTPTransport.SentMessageInfo> {
    return this.emailSender.sendEmail('', '', 'You got message example');
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
