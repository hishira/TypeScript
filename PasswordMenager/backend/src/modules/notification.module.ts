import { Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { NotificationRepository } from 'src/repository/notification.repository';
import { NotificationService } from 'src/services/notification.service';
import { notificationProviders } from 'src/providers/notification.provider';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: Repository,
      useClass: NotificationRepository,
    },
    NotificationService,
    ...notificationProviders,
  ],
  exports: [NotificationService],
})
export class NotificationModule {}