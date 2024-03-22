import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateNotificationCommand } from 'src/commands/notification/CreateNotificationCommand';
import { DeleteNotificationCommand } from 'src/commands/notification/DeleteNotificationCommand';
import { CreateNotificationEmailDTO } from 'src/schemas/dto/createnotification.dto';
import { Logger } from 'src/utils/Logger';
import { EmailSenderMock } from '../../test/mock/EmailSenderMock';
import { entryMock } from '../../test/mock/EntryMock';
import {
  NotificationMock,
  notificationMock,
} from '../../test/mock/NotificationMock';
import { NotificationService } from './notification.service';

jest.mock('src/utils/emailTransporter', () => {
  return {
    EmailSender: EmailSenderMock,
  };
});
//TODO: Check
describe('NotificationService', () => {
  let service: NotificationService;
  let commandBus: CommandBus;
  let queryBus: QueryBus;
  let logger: Logger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
        {
          provide: Logger,
          useValue: {
            setContext: jest.fn(),
            error: jest.fn(),
            logMessage: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<NotificationService>(NotificationService);
    commandBus = module.get<CommandBus>(CommandBus);
    queryBus = module.get<QueryBus>(QueryBus);
    logger = module.get<Logger>(Logger);
  });

  beforeEach(() => jest.clearAllMocks());
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should execute CreateNotificationCommand with correct DTO', async () => {
      // Arrange
      const notificationDTO = new CreateNotificationEmailDTO(
        'test-id',
        '11-03-2024',
        'test-user-id',
      );
      const spy = jest.spyOn(commandBus, 'execute');

      // Act
      await service.create(notificationDTO);

      // Assert
      expect(spy).toHaveBeenCalledWith(
        new CreateNotificationCommand(notificationDTO),
      );
    });
  });

  describe('deleteNotification', () => {
    it('should execute DeleteNotificationCommand with correct id', async () => {
      // Arrange
      const notificationId = 'testNotificationId';
      const spy = jest.spyOn(commandBus, 'execute');
      // Act
      await service.deleteNotification(notificationId);

      // Assert
      expect(spy).toHaveBeenCalledWith(
        new DeleteNotificationCommand({ _id: notificationId }),
      );
    });
  });

  describe('createEmailNotification', () => {
    it('Should use crete function', async () => {
      const entry = entryMock();
      const spy = jest.spyOn(service, 'create');
      await service.createEmailNotification(entry, '12-02-2024');
      expect(spy).toBeCalled();
    });
    it('Should use loger', async () => {
      const entry = entryMock();
      const spy = jest.spyOn(logger, 'logMessage');
      await service.createEmailNotification(entry, '12-02-2024');
      expect(spy).toBeCalled();
    });
  });

  // describe('notificationSend', () => {
  //   it('Should use emailSender sendEmail function', async () => {
  //     const entry = entryMock();
  //     const spy = jest.spyOn(emailSender, 'sendEmail');
  //     await service.notificationSend();
  //     expect(spy).toBeCalled();
  //   });
  // });

  // Add tests for other methods similarly
});
