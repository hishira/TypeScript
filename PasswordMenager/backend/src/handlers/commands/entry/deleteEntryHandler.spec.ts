import { Test, TestingModule } from '@nestjs/testing';
import { DeleteEntryCommand } from 'src/commands/entry/DeleteEntryCommand';
import { EntryRepository } from 'src/repository/entry.repository';
import { IEntry } from 'src/schemas/Interfaces/entry.interface';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { OptionModelBuilder } from 'src/schemas/utils/builders/optionModal.builder';
import { EntryMockModel } from '../../../../test/mock/EntryMock';
import { DeleteEntryHandler } from './deleteEntryHandler';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Logger } from 'src/utils/Logger';

describe('DeleteEntryHandler', () => {
  let handler: DeleteEntryHandler;
  let repositoryMock: Repository<IEntry>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteEntryHandler,
        {
          provide: Repository,
          useClass: EntryRepository,
        },
        {
          provide: 'ENTRY_MODEL',
          useValue: EntryMockModel,
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

    handler = module.get<DeleteEntryHandler>(DeleteEntryHandler);
    repositoryMock = module.get<Repository<IEntry>>(Repository);
  });

  beforeEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it('should handle delete entry command', async () => {
    // Arrange
    const spy = jest.spyOn(repositoryMock, 'delete');

    const deleteEntryInput = {
      id: 'testEntryId',
      groupId: 'testGroupId',
    };

    const deleteEntryCommand = new DeleteEntryCommand(deleteEntryInput);

    // Act
    await handler.execute(deleteEntryCommand);

    // Assert
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should return promise', () => {
    const deleteEntryInput = {
      id: 'testEntryId',
      groupId: 'testGroupId',
    };

    const deleteEntryCommand = new DeleteEntryCommand(deleteEntryInput);

    // Act
    const response = handler.execute(deleteEntryCommand);

    // Assert
    expect(response).toBeInstanceOf(Promise);
  });

  it('Should use OptionModelBuilder', async () => {
    const deleteEntryInput = {
      id: 'testEntryId',
      groupId: 'testGroupId',
    };

    const deleteEntryCommand = new DeleteEntryCommand(deleteEntryInput);
    const spy = jest.spyOn(OptionModelBuilder.prototype, 'getOption');
    // Act
    await handler.execute(deleteEntryCommand);
    expect(spy).toHaveBeenCalledTimes(1);
  });
  // Add more test cases as needed
});
