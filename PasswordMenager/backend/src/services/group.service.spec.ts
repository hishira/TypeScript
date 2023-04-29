import { Test, TestingModule } from '@nestjs/testing';
import { EntryRepository } from 'src/repository/entry.repository';
import { GroupRepository } from 'src/repository/group.repository';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { EntryMockModel } from '../../test/mock/EntryMock';
import {
  CreateGroupDtoMock,
  GroupModelMock,
} from '../../test/mock/GroupModelMock';
import { TestDataUtils } from '../../test/utils/TestDataUtils';
import { TestUtils } from '../../test/utils/TestUtils';
import { EntryService } from './entry.service';
import { GroupService } from './group.service';

describe('GroupService', () => {
  let groupService: GroupService;
  let entryService: EntryService;
  let groupRepository: GroupRepository;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GroupService,
        EntryService,
        EntryRepository,
        {
          provide: Repository,
          useClass: GroupRepository,
        },
        {
          provide: 'GROUP_MODEL',
          useValue: GroupModelMock,
        },
        {
          provide: 'ENTRY_MODEL',
          useValue: EntryMockModel,
        },
      ],
    }).compile();
    groupService = module.get<GroupService>(GroupService);
    entryService = module.get<EntryService>(EntryService);
  });

  beforeEach(() => jest.clearAllMocks());

  it('Group service should be defined', () => {
    expect(groupService).toBeDefined();
  });

  it('Entry service should be defined', () => {
    expect(entryService).toBeDefined();
  });

  //it('Group repositoru should be defined', () => {
  //  expect(groupRepository).toBeDefined();
  //});

  it('Create method should create group', async () => {
    const group = await groupService.create(
      CreateGroupDtoMock(),
      TestDataUtils.getRandomObjectIdAsString(),
    );
    TestUtils.expectHasProperties(group, 'name');
  });

  it('checkifexists should return group', async () => {
    const group = await groupService.checkIfexists(
      TestDataUtils.getRandomObjectIdAsString(),
    );

    TestUtils.expectHasProperties(group, 'name');
  });

  it('getbyuser should return group', async () => {
    const group = await groupService.getbyuser(
      TestDataUtils.getRandomObjectIdAsString(),
    );

    TestUtils.expectHasProperties(group, 'name');
  });

  it('deleteGroup should return promise', () => {
    const deletePromise = groupService.deleteGroup(
      TestDataUtils.getRandomObjectIdAsString(),
    );
    expect(deletePromise).resolves.toBeDefined();
  });

  it('deleteGroup should use deleteByGroup from entryty service nad grouprepository delete', () => {
    const spy1 = jest.spyOn(entryService, 'deleteByGroup');
    // TODO: Check if we can retrive groupRepository
    //const spy2 = jest.spyOn(groupRepository, 'delete');
    const deletePromise = groupService.deleteGroup(
      TestDataUtils.getRandomObjectIdAsString(),
    );
    expect(spy1).toBeCalledTimes(1);
    //expect(spy2).toBeCalledTimes(1);
    expect(deletePromise).resolves.toBeDefined();
  });
});
