import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { UpdateEntryCommand } from 'src/commands/entry/UpdateEntryCommand';
import { EntryRepository } from 'src/repository/entry.repository';
import { EntryInput } from 'src/schemas/Interfaces/EntryInput.interface';
import { EntryState, IEntry } from 'src/schemas/Interfaces/entry.interface';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { EntryBuilder } from 'src/schemas/utils/builders/entry.builder';
import { EntryMockModel } from '../../../../test/mock/EntryMock';
import { UpdateEntryHandler } from './updateEntryHandler';

describe('UpdateEntryHandler', () => {
  let handler: UpdateEntryHandler;
  let repositoryMock: Repository<IEntry>; // Mock your repository
  const entryInput: EntryInput = {
    id: 'entryId123',
    groupId: 'groupId456',
    userId: new Types.ObjectId(32) as unknown as string,
    entryState: EntryState.ACTIVE,
    updateEntryDto: {
      _id: 'entryId123',
      title: 'Example Entry',
      username: 'example_user',
      //password: 'example_password', TODO: Check problem
      email: 'example@example.com',
      url: 'https://example.com',
      note: 'This is an example entry.',
      passwordExpiredDate: '2024-12-31',
    } as any,
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateEntryHandler,
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

    handler = module.get<UpdateEntryHandler>(UpdateEntryHandler);
    repositoryMock = module.get<Repository<IEntry>>(Repository);
  });

  beforeEach(() => {
    process.env.iv = '1111111111111111';
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it('should handle update entry command', async () => {
    // Arrange
    const spy = jest.spyOn(repositoryMock, 'update');
    const updateEntryCommand = new UpdateEntryCommand(entryInput);

    // Act
    await handler.execute(updateEntryCommand);

    // Assert
    expect(spy).toHaveBeenCalledTimes(1);
  });
  it('should return promise', () => {
    const updateEntryCommand = new UpdateEntryCommand(entryInput);

    // Act
    const response = handler.execute(updateEntryCommand);
    expect(response).toBeInstanceOf(Promise);
  });
  it('Should use EntryBuilder', async () => {
    // Arrange
    const spy = jest.spyOn(EntryBuilder.prototype, 'getEntry');
    const updateEntryCommand = new UpdateEntryCommand(entryInput);

    // Act
    await handler.execute(updateEntryCommand);

    // Assert
    expect(spy).toHaveBeenCalledTimes(3);
  });

  // Add more test cases as needed
});
