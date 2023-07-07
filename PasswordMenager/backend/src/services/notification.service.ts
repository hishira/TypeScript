import { Injectable, Inject } from '@nestjs/common';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { INotification } from 'src/schemas/Interfaces/notification.interface';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { CreateNotificationDTO } from 'src/schemas/dto/createnotification.dto';
import { EmailSender } from 'src/utils/emailTransporter';

@Injectable()
export class NotificationService {
  private emailSender: EmailSender;
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
}
