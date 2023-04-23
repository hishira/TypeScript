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

  it('gebygroupid function shoould return entry', async () => {
    const entry = await entryService.getbygroupid(
      new Types.ObjectId(32).toString(),
    );
    TestUtils.expectHasProperties(entry, 'note', 'password', 'username');
  });

  it('deletebyid should return object', async () => {
    const deleterEntryInfo = await entryService.deletebyid(
      new Types.ObjectId(32).toString(),
    );
    TestUtils.expectHasProperties(deleterEntryInfo, 'status', 'respond');
  });

  it('deleteByGroup should return promise', async () => {
    const promiseDeleted = entryService.deleteByGroup(
      new Types.ObjectId(32).toString(),
    );

    expect(promiseDeleted).resolves.toBeDefined();
  });

  // TODO: Change find model function to return arrya of object

  it('getByUser should return object of entry', async () => {
    const entryByUser = await entryService.getByUser(
      new Types.ObjectId(32).toString(),
    );

    expect(entryByUser).toBeDefined();
  });

  it('editentry should return object', async () => {
    const editedObjectInfo = await entryService.editentry({
      _id: new Types.ObjectId(32).toString(),
      note: 'example',
      password: 'example',
      title: 'example',
      username: 'example',
    });

    TestUtils.expectHasProperties(editedObjectInfo, 'status', 'respond');
  });
});
