import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { INotification } from 'src/schemas/Interfaces/notification.interface';
import { NotificationMock } from '../../test/mock/NotificationMock';
import { NotificationRepository } from './notification.repository';

describe('NotificationRepository', () => {
  let notificationModel: Model<INotification>;
  let notificationRepo: NotificationRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationRepository,
        {
          provide: 'NOTIFICATION_MODEL',
          useValue: NotificationMock,
        },
      ],
    }).compile();

    notificationModel = module.get<Model<INotification>>('NOTIFICATION_MODEL');
    notificationRepo = module.get<NotificationRepository>(
      NotificationRepository,
    );
  });
  beforeEach(() => jest.clearAllMocks());
  describe('Model & repository', () => {
    it('Repository should be defined', () => {
      expect(notificationRepo).toBeDefined();
    });
    it('Model should be defined', () => {
      expect(notificationModel).toBeDefined();
    });
  });
});
