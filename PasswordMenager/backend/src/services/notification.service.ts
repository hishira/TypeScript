import { Injectable, Inject } from '@nestjs/common';
import { INotification } from 'src/schemas/Interfaces/notification.interface';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { CreateNotificationDTO } from 'src/schemas/dto/createnotification.dto';

@Injectable()
export class NotificationService {
  constructor(
    @Inject(Repository)
    private readonly notificationRepository: Repository<INotification>,
  ) {}

  create(notificationDTO: CreateNotificationDTO) {
    return this.notificationRepository.create(notificationDTO);
  }
}
