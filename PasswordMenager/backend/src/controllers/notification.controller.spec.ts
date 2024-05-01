import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { EditNotificationDTO } from 'src/schemas/dto/editnotification.dto';
import { NotificationService } from 'src/services/notification.service';
import { Logger } from 'src/utils/Logger';
import {
  NotificationMock,
  notificationMock,
} from '../../test/mock/NotificationMock';
import { NotificationController } from './notification.controller';
import { EventEmitter2 } from '@nestjs/event-emitter';

describe('NotificationController', () => {
  let controller: NotificationController;
  let notificationService: NotificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationController],
      providers: [
        NotificationService,
        {
          provide: 'NOTIFICATION_MODEL',
          useValue: NotificationMock,
        },
        {
          provide: CommandBus,
          useValue: {
            execute: () => Promise.resolve(notificationMock()),
          },
        },
        {
          provide: QueryBus,
          useValue: {
            execute: () => Promise.resolve(notificationMock()),
          },
        },
        Logger,
        {
          provide: EventEmitter2,
          useValue: {
            emit: jest.fn(),
            emitAsync: jest.fn(),
          },
        },
        // {
        //   provide: Logger,
        //   useValue: {
        //     setContext: jest.fn(),
        //     error: jest.fn(),
        //     logMessage: jest.fn(),
        //   },
        // },
      ],
    }).compile();

    controller = module.get<NotificationController>(NotificationController);
    notificationService = module.get<NotificationService>(NotificationService);
  });

  beforeEach(() => jest.clearAllMocks());
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('entiresWithNotifications', () => {
    it('should call userNotification from NotificationService', async () => {
      // Arrange
      const user = { _id: 'userId' };
      const req = { user };
      const spy = jest.spyOn(notificationService, 'userNotification');
      // Act
      const result = await controller.entiresWithNotifications(req);

      // Assert
      expect(result).toEqual(notificationMock());
      expect(spy).toHaveBeenCalledWith(user._id);
    });
  });

  describe('deleteNotification', () => {
    it('should call deleteNotification from NotificationService with correct id', async () => {
      // Arrange
      const notificationId = 'notificationId';
      const spy = jest.spyOn(notificationService, 'deleteNotification');

      // Act
      const result = await controller.deleteNotification(notificationId);

      // Assert
      expect(result).toEqual(notificationMock());
      expect(spy).toHaveBeenCalledWith(notificationId);
    });
  });

  describe('editNotification', () => {
    it('should call editNotification from NotificationService with correct DTO', async () => {
      // Arrange
      const editNotificationDTO: EditNotificationDTO = {
        _id: 'ads',
        notficationDate: 'test',
      };
      const spy = jest.spyOn(notificationService, 'editNotification');

      // Act
      const result = await controller.editNotification(editNotificationDTO);

      // Assert
      expect(result).toEqual(notificationMock());
      expect(spy).toHaveBeenCalledWith(editNotificationDTO);
    });
  });
});
