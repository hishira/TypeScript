import { Test, TestingModule } from '@nestjs/testing';
import { CreateHistoryCommand } from 'src/commands/history/CreateHistoryCommand';
import { HistoryRepository } from 'src/repository/history.repository';
import { IHistory } from 'src/schemas/Interfaces/history.interface';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { HistoryMockData } from '../../../../test/mock/HistoryMock';
import { CreateHisotryHandler } from './createHistoryHandler';
import { HistoryDTOMapper } from 'src/schemas/mapper/historyDtoMapper';

describe('CreateHisotryHandler', () => {
  let handler: CreateHisotryHandler;
  let historyRepository: Repository<IHistory>; // Replace with the actual type of your repository

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateHisotryHandler,
        {
          provide: 'HISTORY_MODEL',
          useValue: HistoryMockData,
        },
        {
          provide: Repository,
          useClass: HistoryRepository,
        },
      ],
    }).compile();

    handler = module.get<CreateHisotryHandler>(CreateHisotryHandler);
    historyRepository = module.get<Repository<IHistory>>(Repository);
  });

  beforeEach(() => jest.clearAllMocks());
  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it('should return promise', () => {
    const command = new CreateHistoryCommand('testUserId');

    // Act
    const response = handler.execute(command);

    // Assert
    expect(response).toBeInstanceOf(Promise);
  });
  it('should create a history', async () => {
    // Arrange
    const spy = jest.spyOn(historyRepository, 'create');
    const command = new CreateHistoryCommand('testUserId');

    // Act
    await handler.execute(command);

    // Assert
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should use HistoryDtoMapper', async () => {
    // Arrange
    const spy = jest.spyOn(HistoryDTOMapper, 'CreateHistoryDTO');
    const command = new CreateHistoryCommand('testUserId');

    // Act
    await handler.execute(command);

    // Assert
    expect(spy).toHaveBeenCalledTimes(1);
  });

  // Add more test cases as needed
});
