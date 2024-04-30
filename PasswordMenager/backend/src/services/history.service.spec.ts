import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateHistoryCommand } from 'src/commands/history/CreateHistoryCommand';
import { UpdateHistoryCommand } from 'src/commands/history/UpdateHistoryCommand';
import { HistoryAppendEvent } from 'src/events/historyAppendEvent';
import { HistoryRepository } from 'src/repository/history.repository';
import { IEntry } from 'src/schemas/Interfaces/entry.interface';
import { IGroup } from 'src/schemas/Interfaces/group.interface';
import { entryMock } from '../../test/mock/EntryMock';
import { groupMock } from '../../test/mock/GroupModelMock';
import { HistoryMockData, historyMock } from '../../test/mock/HistoryMock';
import { HistoryService } from './history.service';
import { IHistory } from 'src/schemas/Interfaces/history.interface';
import { Logger } from 'src/utils/Logger';
import { EventEmitter2 } from '@nestjs/event-emitter';

describe('HistoryRepository', () => {
  let service: HistoryService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HistoryService,
        HistoryRepository,
        {
          provide: EventEmitter2,
          useValue: {
            emit: jest.fn(),
            emitAsync: jest.fn(),
          },
        },
        {
          provide: QueryBus,
          useValue: {
            execute: (...params): Promise<IHistory> =>
              Promise.resolve(historyMock()),
          },
        },
        {
          provide: CommandBus,
          useValue: {
            execute: (...params): Promise<IHistory> =>
              Promise.resolve(historyMock()),
          },
        },
        {
          provide: 'HISTORY_MODEL',
          useValue: HistoryMockData,
        },
        Logger,
      ],
    }).compile();

    service = module.get<HistoryService>(HistoryService);
    commandBus = module.get<CommandBus>(CommandBus);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should call execute on CommandBus with CreateHistoryCommand', async () => {
      // Arrange
      const userId = 'testUserId';
      const spy = jest.spyOn(commandBus, 'execute');

      // Act
      await service.create(userId);

      // Assert
      expect(spy).toHaveBeenCalledWith(new CreateHistoryCommand(userId));
    });
  });

  describe('eventHistoryUpdate', () => {
    it('should call appendEntityToHistory when historyAddType is "entry"', async () => {
      // Arrange
      const payload: HistoryAppendEvent = new HistoryAppendEvent(
        'testUserId',
        [entryMock()],
        'entry',
      );
      const spy1 = jest.spyOn(service, 'appendEntityToHistory');
      const spy2 = jest.spyOn(service, 'appendGroupToHistory');
      // Act
      await service.eventHistoryUpdate(payload);

      // Assert
      expect(spy1).toHaveBeenCalledWith(payload.useridString, payload.objects);
      expect(spy2).not.toHaveBeenCalled();
    });

    it('should call appendGroupToHistory when historyAddType is "group"', async () => {
      // Arrange
      const payload: HistoryAppendEvent = new HistoryAppendEvent(
        'testUserId',
        [groupMock()],
        'group',
      );
      const spy1 = jest.spyOn(service, 'appendEntityToHistory');
      const spy2 = jest.spyOn(service, 'appendGroupToHistory');
      // Act
      await service.eventHistoryUpdate(payload);

      // Assert
      expect(spy2).toHaveBeenCalledWith(payload.useridString, payload.objects);
      expect(spy1).not.toHaveBeenCalled();
    });
  });

  describe('appendEntityToHistory', () => {
    it('should call execute on CommandBus with UpdateHistoryCommand for entries', async () => {
      // Arrange
      const userId = 'testUserId';
      const entries: IEntry[] = [entryMock()];
      const spy = jest.spyOn(commandBus, 'execute');

      // Act
      await service.appendEntityToHistory(userId, entries);
      // Assert
      expect(spy).toHaveBeenCalledWith(
        new UpdateHistoryCommand({
          userId,
          entries,
        }),
      );
    });
  });

  describe('appendGroupToHistory', () => {
    it('should call execute on CommandBus with UpdateHistoryCommand for groups', async () => {
      // Arrange
      const userId = 'testUserId';
      const groups: IGroup[] = [groupMock()];
      const spy = jest.spyOn(commandBus, 'execute');

      // Act
      await service.appendGroupToHistory(userId, groups);

      // Assert
      expect(spy).toHaveBeenCalledWith(
        new UpdateHistoryCommand({
          userId,
          groups,
        }),
      );
    });
  });
});
