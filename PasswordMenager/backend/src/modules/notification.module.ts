import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { NotificationController } from 'src/controllers/notification.controller';
import { CreateNotificationCommandHandler } from 'src/handlers/commands/notification/createNotificationHandler';
import { notificationProviders } from 'src/providers/notification.provider';
import { NotificationRepository } from 'src/repository/notification.repository';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { NotificationService } from 'src/services/notification.service';
import { DatabaseModule } from './database.module';
import { LoggerModule } from './logger.module';

@Module({
  imports: [DatabaseModule, LoggerModule, CqrsModule],
  providers: [
    {
      provide: Repository,
      useClass: NotificationRepository,
    },
    NotificationService,
    ...notificationProviders,
    CreateNotificationCommandHandler,
  ],
  controllers: [NotificationController],
  exports: [NotificationService],
})
export class NotificationModule {}
