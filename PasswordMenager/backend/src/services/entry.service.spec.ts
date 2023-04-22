import { Test, TestingModule } from '@nestjs/testing';
import { EntryService } from './entry.service';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { EntryRepository } from 'src/repository/entry.repository';
import { EntryMockModel } from '../../test/mock/EntryMock';
import { Types } from 'mongoose';
import { TestUtils } from '../../test/utils/TestUtils';

describe('EntryService', () => {
  let entryService: EntryService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EntryService,
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

    entryService = module.get<EntryService>(EntryService);
  });

  beforeEach(() => jest.clearAllMocks());

  it('Entry service should be defined', () => {
    expect(entryService).toBeDefined();
  });

  it('Create method shoould create entry', async () => {
    const id = new Types.ObjectId(32);
    const entry = await entryService.create(
      {
        groupid: id.toString(),
        note: 'example',
        password: 'example',
        title: 'example',
        username: 'example',
        toObject: () => ({}),
      },
      id.toString(),
    );
    TestUtils.expectHasProperties(entry, 'note', 'password', 'username');
  });

  it('getById should return object', async () => {
    const entry = await entryService.getById(new Types.ObjectId(32).toString());

    TestUtils.expectHasProperties(entry, 'note', 'password', 'username');
  });
});
