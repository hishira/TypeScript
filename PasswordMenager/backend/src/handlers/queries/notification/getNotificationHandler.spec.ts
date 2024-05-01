import { Test } from '@nestjs/testing';
import { GetNotificationQuery } from 'src/queries/notification/getNotification.queries';
import { NotificationRepository } from 'src/repository/notification.repository';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { NotificationUtils } from 'src/schemas/utils/Notification.utils';
import { ActiveNotificationFilter } from 'src/schemas/utils/activeNotificationFilter';
import { NotificationMock } from '../../../../test/mock/NotificationMock';
import { GetNotificationQueryHandler } from './getNotificationHandler';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Logger } from 'src/utils/Logger';
describe('GetNotificationQueryHandler', () => {
  let handler: GetNotificationQueryHandler;
  let repositoryMock: NotificationRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        GetNotificationQueryHandler,
        { provide: Repository, useClass: NotificationRepository },
        {
          provide: EventEmitter2,
          useValue: {
            emit: jest.fn(),
            emitAsync: jest.fn(),
          },
        },
        Logger,
        {
          provide: 'NOTIFICATION_MODEL',
          useValue: NotificationMock,
        },
      ],
    }).compile();

    handler = module.get<GetNotificationQueryHandler>(
      GetNotificationQueryHandler,
    );
    repositoryMock = module.get<NotificationRepository>(Repository);
  });
  beforeEach(() => jest.clearAllMocks());
  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it('should return notifications filtered by userId', async () => {
    // Arrange
    const userId = 'userId123';

    const spy = jest.spyOn(repositoryMock, 'find');
    const query = new GetNotificationQuery({ userId });

    // Act
    await handler.execute(query);

    // Assert
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should return active notifications', async () => {
    // Arrange

    const query = new GetNotificationQuery({ active: true });

    const spy = jest.spyOn(repositoryMock, 'find');
    // Act
    await handler.execute(query);
    // Assert
    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining(new ActiveNotificationFilter()),
    );
  });

  it('should return all notifications if no filters applied', async () => {
    // Arrange

    const query = new GetNotificationQuery({});

    const spy = jest.spyOn(
      NotificationUtils as any,
      'GetAllNotificationFilter',
      'get',
    );
    // Act
    await handler.execute(query);

    // Assert
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('Should return promise', () => {
    const query = new GetNotificationQuery({});
    const respose = handler.execute(query);
    expect(respose).toBeInstanceOf(Promise);
  });
});
