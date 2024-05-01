import { Test, TestingModule } from '@nestjs/testing';
import { UpdateHistoryCommand } from 'src/commands/history/UpdateHistoryCommand';
import { HistoryRepository } from 'src/repository/history.repository';
import { IGroup } from 'src/schemas/Interfaces/group.interface';
import { IHistory } from 'src/schemas/Interfaces/history.interface';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { HistoryBuilder } from 'src/schemas/utils/builders/history.builder';
import { entryMock } from '../../../../test/mock/EntryMock';
import { groupMock } from '../../../../test/mock/GroupModelMock';
import { HistoryMockData } from '../../../../test/mock/HistoryMock';
import { UpdateHistoryHandler } from './updateHistoryHandler';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Logger } from 'src/utils/Logger';

// // Your actual repository implementation
// class MyRepository {
//   update(partialHistory: Partial<IHistory>): Promise<IHistory> {
//     // Your implementation here, returning a Promise<IHistory>
//     return Promise.resolve(/* your updated history object */);
//   }
// }

describe('UpdateHistoryHandler', () => {
  let handler: UpdateHistoryHandler;
  let repository: Repository<IHistory>; // Replace with the actual type of your repository

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateHistoryHandler,
        {
          provide: 'HISTORY_MODEL',
          useValue: HistoryMockData,
        },
        {
          provide: Repository,
          useClass: HistoryRepository,
        },
        {
          provide: EventEmitter2,
          useValue: {
            emit: jest.fn(),
            emitAsync: jest.fn(),
          },
        },
        Logger,
      ],
    }).compile();

    handler = module.get<UpdateHistoryHandler>(UpdateHistoryHandler);
    repository = module.get<Repository<IHistory>>(Repository);
  });
  beforeEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it('should update a history', async () => {
    // Arrange
    const spy = jest.spyOn(repository, 'update');
    const command = new UpdateHistoryCommand({
      entries: [entryMock(), entryMock()],
      groups: [groupMock() as IGroup, groupMock() as IGroup],
      userId: 'testUserId',
    });

    await handler.execute(command);

    // Assert
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should return promise', () => {
    const command = new UpdateHistoryCommand({
      entries: [entryMock(), entryMock()],
      groups: [groupMock() as IGroup, groupMock() as IGroup],
      userId: 'testUserId',
    });

    const response = handler.execute(command);
    expect(response).toBeInstanceOf(Promise);
  });
  it('should use HistoryBuilder', async () => {
    const spy = jest.spyOn(HistoryBuilder.prototype, 'getPartialHistory');
    const command = new UpdateHistoryCommand({
      entries: [entryMock(), entryMock()],
      groups: [groupMock() as IGroup, groupMock() as IGroup],
      userId: 'testUserId',
    });

    await handler.execute(command);
    expect(spy).toBeCalledTimes(1);
  });

  afterAll(() => {
    // Optionally clean up any resources after all tests
  });
});
