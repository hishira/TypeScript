import { Test, TestingModule } from '@nestjs/testing';
import { DeleteNotificationCommand } from 'src/commands/notification/DeleteNotificationCommand';
import { NotificationRepository } from 'src/repository/notification.repository';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { NotificationMock } from '../../../../test/mock/NotificationMock';
import { DeleteNotificationCommandHandler } from './deleteNotificationHandler';

describe('DeleteNotificationCommandHandler', () => {
  let handler: DeleteNotificationCommandHandler;
  let repository: NotificationRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteNotificationCommandHandler,
        { provide: Repository, useClass: NotificationRepository },
        {
          provide: 'NOTIFICATION_MODEL',
          useValue: NotificationMock,
        },
      ],
    }).compile();

    handler = module.get<DeleteNotificationCommandHandler>(
      DeleteNotificationCommandHandler,
    );
    repository = module.get<NotificationRepository>(Repository);
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it('should return promise', () => {
    const command = new DeleteNotificationCommand({ _id: 'testId' });

    // Act
    const response = handler.execute(command);
    expect(response).toBeInstanceOf(Promise);
  });

  it('should delete a notification', async () => {
    // Arrange
    const spy = jest.spyOn(repository, 'delete');
    const command = new DeleteNotificationCommand({ _id: 'testId' });

    // Act
    await handler.execute(command);

    // Assert
    expect(spy).toHaveBeenCalledWith({
      getOption: expect.any(Function), // You may adjust this based on your actual implementation
    });
  });
});
