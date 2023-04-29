import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { EntryRepository } from 'src/repository/entry.repository';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import {
  CreateEntryDtoMock,
  EditEntryDtoMock,
  EntryMockModel,
} from '../../test/mock/EntryMock';
import { TestDataUtils } from '../../test/utils/TestDataUtils';
import { TestUtils } from '../../test/utils/TestUtils';
import { EntryService } from './entry.service';

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
    const entry = await entryService.create(
      CreateEntryDtoMock(),
      TestDataUtils.getRandomObjectIdAsString(),
    );
    TestUtils.expectHasProperties(entry, 'note', 'password', 'username');
  });

  it('getById should return object', async () => {
    const entry = await entryService.getById(new Types.ObjectId(32).toString());

    TestUtils.expectHasProperties(entry, 'note', 'password', 'username');
  });

  it('gebygroupid function shoould return entry', async () => {
    const entry = await entryService.getbygroupid(
      TestDataUtils.getRandomObjectIdAsString(),
    );
    TestUtils.expectHasProperties(entry, 'note', 'password', 'username');
  });

  it('deletebyid should return object', async () => {
    const deleterEntryInfo = await entryService.deletebyid(
      TestDataUtils.getRandomObjectIdAsString(),
    );
    TestUtils.expectHasProperties(deleterEntryInfo, 'status', 'respond');
  });

  it('deleteByGroup should return promise', async () => {
    const promiseDeleted = entryService.deleteByGroup(
      TestDataUtils.getRandomObjectIdAsString(),
    );

    expect(promiseDeleted).resolves.toBeDefined();
  });

  // TODO: Change find model function to return arrya of object

  it('getByUser should return object of entry', async () => {
    const entryByUser = await entryService.getByUser(
      TestDataUtils.getRandomObjectIdAsString(),
    );

    expect(entryByUser).toBeDefined();
  });

  it('editentry should return object', async () => {
    const editedObjectInfo = await entryService.editentry(EditEntryDtoMock());

    TestUtils.expectHasProperties(editedObjectInfo, 'status', 'respond');
  });
});
