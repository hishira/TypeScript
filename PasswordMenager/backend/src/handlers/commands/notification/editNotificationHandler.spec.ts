import { Test, TestingModule } from '@nestjs/testing';
import { EditNotificationCommand } from 'src/commands/notification/EditNotificationCommand';
import { NotificationRepository } from 'src/repository/notification.repository';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { NotificationMock } from '../../../../test/mock/NotificationMock';
import { EditNotificationHandler } from './editNotificationHandler';

describe('EditNotificationHandler', () => {
  let handler: EditNotificationHandler;
  let repository: NotificationRepository;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: Repository, useClass: NotificationRepository },
        {
          provide: 'NOTIFICATION_MODEL',
          useValue: NotificationMock,
        },
        EditNotificationHandler,
      ],
    }).compile();

    handler = module.get<EditNotificationHandler>(EditNotificationHandler);
    repository = module.get<NotificationRepository>(Repository);
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it('should update a notification', async () => {
    // Arrange
    const spy = jest.spyOn(repository, 'update');
    const command = new EditNotificationCommand(
      { _id: 'testId' }, // Provide a sample notificationInput here
    );

    // Act
    await handler.execute(command);

    // Assert
    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining(command.notificationInput),
    );
  });
  it('should return promise', async () => {
    // Arrange
    const command = new EditNotificationCommand(
      { _id: 'testId' }, // Provide a sample notificationInput here
    );

    // Act
    const response = handler.execute(command);

    // Assert
    expect(response).toBeInstanceOf(Promise);
  });
});
