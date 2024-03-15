import { Test, TestingModule } from '@nestjs/testing';
import { GetSpecificEntry } from 'src/queries/entry/getSpecificEntry.queries';
import { EntryRepository } from 'src/repository/entry.repository';
import { EntryState, IEntry } from 'src/schemas/Interfaces/entry.interface';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { EntryMockModel } from '../../../../test/mock/EntryMock';
import { GetSpecificEntryQueryHandler } from './getSpecificEntry.queries';

describe('CreateEntryHandler', () => {
  let handler: GetSpecificEntryQueryHandler;
  let repositoryMock: Repository<IEntry>; // Mock your repository
  const getSpecificEntryQuery: GetSpecificEntry = new GetSpecificEntry({
    id: 'test-id',
    groupId: 'test-group-id',
    title: 'test-title',
    userId: 'test-user-id',
    entryState: EntryState.ACTIVE,
  });
  const getSpecificatEntryQueryWithLimit: GetSpecificEntry =
    new GetSpecificEntry({
      id: 'test-id',
      groupId: 'test-group-id',
      title: 'test-title',
      userId: 'test-user-id',
      entryState: EntryState.ACTIVE,
      limit: 10,
      paginator: {
        page: 1,
      },
      page: 1,
    });
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetSpecificEntryQueryHandler,

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

    handler = module.get<GetSpecificEntryQueryHandler>(
      GetSpecificEntryQueryHandler,
    );
    repositoryMock = module.get<Repository<IEntry>>(Repository);
  });
  beforeEach(() => jest.clearAllMocks());

  it('handler should be defined', () => {
    expect(handler).toBeDefined();
  });
  it('should return promise', () => {
    const response = handler.execute(getSpecificEntryQuery);
    expect(response).toBeInstanceOf(Promise);
  });
  it('should use find function', async () => {
    const spy = jest.spyOn(repositoryMock, 'find');
    await handler.execute(getSpecificEntryQuery);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
