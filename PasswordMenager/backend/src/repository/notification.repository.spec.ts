import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { INotification } from 'src/schemas/Interfaces/notification.interface';
import {
  NotificationMock,
  notificationMock,
} from '../../test/mock/NotificationMock';
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

  describe('Create', () => {
    it('should return promise', () => {
      const response = notificationRepo.create({ toObject: () => ({}) });
      expect(response).toBeInstanceOf(Promise);
    });

    it('Should return INotification', async () => {
      const response = await notificationRepo.create({ toObject: () => ({}) });
      expect(response).toHaveProperty('_id');
      expect(response).toHaveProperty('notificationChannel');
      expect(response).toHaveProperty('notificationDate');
    });
  });

  describe('Find', () => {
    it('should return array', async () => {
      const response = await notificationRepo.find({ getOption: () => ({}) });
      expect(response).toBeInstanceOf(Array);
    });

    it('Should return INotification', async () => {
      const response = await notificationRepo.find({ getOption: () => ({}) });
      expect(response[0]).toHaveProperty('_id');
      expect(response[0]).toHaveProperty('notificationChannel');
      expect(response[0]).toHaveProperty('notificationDate');
    });
  });

  describe('FindById', () => {
    it('should return object', async () => {
      const response = await notificationRepo.findById('');
      expect(response).toBeInstanceOf(Object);
    });

    it('Should return INotification', async () => {
      const response = await notificationRepo.findById('');
      expect(response).toHaveProperty('_id');
      expect(response).toHaveProperty('notificationChannel');
      expect(response).toHaveProperty('notificationDate');
    });
  });

  describe('Update', () => {
    it('should use findOneAndUpdate function', async () => {
      const spy = jest.spyOn(notificationModel, 'findOneAndUpdate');
      const response = await notificationRepo.update(notificationMock());
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('Should return INotification', async () => {
      const response = await notificationRepo.update(notificationMock());
      expect(response).toHaveProperty('_id');
      expect(response).toHaveProperty('notificationChannel');
      expect(response).toHaveProperty('notificationDate');
    });
  });

  describe('Delete', () => {
    it('should use deleteOne function', async () => {
      const spy = jest.spyOn(notificationModel, 'deleteOne');
      await notificationRepo.delete({ getOption: () => ({}) });
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getById', () => {
    it('should not be implemented', async () => {
      expect(notificationRepo.getById).toThrow('Method not implemented.');
    });
  });
});
