import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Test, TestingModule } from '@nestjs/testing';
import { GroupRepository } from 'src/repository/group.repository';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import {
  CreateGroupDtoMock,
  GroupModelMock,
  groupMock,
} from '../../test/mock/GroupModelMock';
import { TestDataUtils } from '../../test/utils/TestDataUtils';
import { TestUtils } from '../../test/utils/TestUtils';
import { GroupService } from './group.service';

describe('GroupService', () => {
  let groupService: GroupService;
  let groupRepository: GroupRepository;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GroupService,
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
            execute: (...params) => Promise.resolve(groupMock()),
          },
        },
        {
          provide: CommandBus,
          useValue: {
            execute: (...params) => Promise.resolve(groupMock()),
          },
        },
        {
          provide: Repository,
          useClass: GroupRepository,
        },
        {
          provide: 'GROUP_MODEL',
          useValue: GroupModelMock,
        },
      ],
    }).compile();
    groupRepository = module.get<GroupRepository>(Repository);
    groupService = module.get<GroupService>(GroupService);
  });

  beforeEach(() => jest.clearAllMocks());

  it('Group service should be defined', () => {
    expect(groupService).toBeDefined();
  });

  it('Entry service should be defined', () => {
    expect(groupRepository).toBeDefined();
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
    // TODO: Check if we can retrive groupRepository
    //const spy2 = jest.spyOn(groupRepository, 'delete');
    const deletePromise = groupService.deleteGroup(
      TestDataUtils.getRandomObjectIdAsString(),
    );
    //expect(spy2).toBeCalledTimes(1);
    expect(deletePromise).resolves.toBeDefined();
  });
});
