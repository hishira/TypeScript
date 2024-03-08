import { Test, TestingModule } from '@nestjs/testing';
import { CreateNotificationCommand } from 'src/commands/notification/CreateNotificationCommand';
import { NotificationRepository } from 'src/repository/notification.repository';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { NotificationMock } from '../../../../test/mock/NotificationMock';
import { CreateNotificationCommandHandler } from './createNotificationHandler';

describe('CreateNotificationCommandHandler', () => {
  let handler: CreateNotificationCommandHandler;
  let repository: NotificationRepository; // Replace with the actual type of your repository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: Repository, useClass: NotificationRepository },
        {
          provide: 'NOTIFICATION_MODEL',
          useValue: NotificationMock,
        },
        CreateNotificationCommandHandler,
      ],
    }).compile();

    handler = module.get<CreateNotificationCommandHandler>(
      CreateNotificationCommandHandler,
    );
    repository = module.get<NotificationRepository>(Repository);
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it('should return promise', async () => {
    // Arrange
    const command = new CreateNotificationCommand({
      entryId: 'test',
      notificationChannel: 'SMS',
      notificationDate: '02/02/2020',
      userid: 'test',
      toObject: () => ({}),
    });

    const retunred = handler.execute(command);

    expect(retunred).toBeInstanceOf(Promise);
  });
  it('should create a notification', async () => {
    const spy = jest.spyOn(repository, 'create');
    const command = new CreateNotificationCommand({
      entryId: 'test',
      notificationChannel: 'SMS',
      notificationDate: '02/02/2020',
      userid: 'test',
      toObject: () => ({}),
    });

    await handler.execute(command);

    expect(spy).toHaveBeenCalledWith(command.notificationDto);
  });
});
