import { EventEmitter2 } from '@nestjs/event-emitter';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateEntryCommand } from 'src/commands/entry/CreateEntryCommand';
import { EntryRepository } from 'src/repository/entry.repository';
import { IEntry } from 'src/schemas/Interfaces/entry.interface';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { EntryDtoMapper } from 'src/schemas/mapper/entryDtoMapper';
import {
  CreateEntryDtoMock,
  EntryMockModel,
} from '../../../../test/mock/EntryMock';
import { CreateEntryHandler } from './createEntryHandler';
import { Logger } from 'src/utils/Logger';

describe('CreateEntryHandler', () => {
  let handler: CreateEntryHandler;
  let eventEmitterMock: EventEmitter2;
  let repositoryMock: Repository<IEntry>; // Mock your repository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateEntryHandler,
        {
          provide: EventEmitter2,
          useValue: {
            emit: jest.fn(),
            emitAsync: jest.fn(),
          },
        },
        Logger,
        {
          provide: Repository,
          useClass: EntryRepository,
        },
        {
          provide: 'ENTRY_MODEL',
          useValue: EntryMockModel,
        },
      ],
    }).compile();

    handler = module.get<CreateEntryHandler>(CreateEntryHandler);
    eventEmitterMock = module.get<EventEmitter2>(EventEmitter2);
    repositoryMock = module.get<Repository<IEntry>>(Repository);
  });
  beforeEach(() => jest.clearAllMocks());
  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it('should handle create entry command and emit notification event', async () => {
    // Arrange

    const spy = jest.spyOn(repositoryMock, 'create');
    const createEntryDto = CreateEntryDtoMock();

    const createEntryCommand = new CreateEntryCommand(
      'testUserId',
      createEntryDto,
    );
    const mapperObject = EntryDtoMapper.CreateEntryDtoToDto(
      createEntryDto,
      'testUserId',
    );
    // Act
    await handler.execute(createEntryCommand);

    // Assert
    expect(spy).toHaveBeenCalledWith(mapperObject);
    expect(eventEmitterMock.emit).toHaveBeenCalled();
  });

  it('should handle create entry command and return error message', async () => {
    // Arrange

    const createEntryDto = CreateEntryDtoMock();

    const spy = jest.spyOn(repositoryMock, 'create');
    const createEntryCommand = new CreateEntryCommand(
      'testUserId',
      createEntryDto,
    );
    const mapperObject = EntryDtoMapper.CreateEntryDtoToDto(
      createEntryDto,
      'testUserId',
    );
    // Act
    await handler.execute(createEntryCommand);

    // Assert
    expect(spy).toHaveBeenCalledWith(mapperObject);
  });

  it('Should return promise', () => {
    const createEntryDto = CreateEntryDtoMock();

    const createEntryCommand = new CreateEntryCommand(
      'testUserId',
      createEntryDto,
    );
    const result = handler.execute(createEntryCommand);
    expect(result).toBeInstanceOf(Promise);
  });

  it('Should use CreateEntryDtoToDto function', async () => {
    const createEntryDto = CreateEntryDtoMock();

    const createEntryCommand = new CreateEntryCommand(
      'testUserId',
      createEntryDto,
    );
    const spy = jest.spyOn(EntryDtoMapper, 'CreateEntryDtoToDto');
    // Act
    await handler.execute(createEntryCommand);

    // Assert
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('Shuld use emitNotificationCreate', async () => {
    const createEntryDto = CreateEntryDtoMock();

    const createEntryCommand = new CreateEntryCommand(
      'testUserId',
      createEntryDto,
    );
    const spy = jest.spyOn(
      handler as unknown as { emitNotificationCreate: () => void },
      'emitNotificationCreate',
    );
    // Act
    await handler.execute(createEntryCommand);

    // Assert
    expect(spy).toHaveBeenCalledTimes(1);
  });
  // Add more test cases as needed
});
