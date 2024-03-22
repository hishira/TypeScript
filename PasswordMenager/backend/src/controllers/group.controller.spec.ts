import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Test, TestingModule } from '@nestjs/testing';
import { GroupRepository } from 'src/repository/group.repository';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { GroupService } from 'src/services/group.service';
import {
  CreateGroupDtoMock,
  GroupModelMock,
  groupMock,
} from '../../test/mock/GroupModelMock';
import { UserRequestMock } from '../../test/mock/UserModelMock';
import { TestDataUtils } from '../../test/utils/TestDataUtils';
import { TestUtils } from '../../test/utils/TestUtils';
import { GroupController } from './group.controller';

describe('GroupController', () => {
  let groupController: GroupController;
  let groupService: GroupService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupController],
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

    groupController = module.get<GroupController>(GroupController);
    groupService = module.get<GroupService>(GroupService);
  });

  beforeEach(() => jest.clearAllMocks());

  describe('Should be defined', () => {
    it('Group controller should be defined', () => {
      expect(groupController).toBeDefined();
    });
    it('Group service should be defined', () => {
      expect(groupService).toBeDefined();
    });
  });

  describe('Create function', () => {
    it('Should use create method from groupServoce', async () => {
      const spy = jest.spyOn(groupService, 'create');
      await groupController.create(CreateGroupDtoMock(), UserRequestMock());
      expect(spy).toBeCalledTimes(1);
    });
    it('Should return promise', () => {
      const response = groupController.create(
        CreateGroupDtoMock(),
        UserRequestMock(),
      );
      expect(response).resolves.toBeDefined();
    });

    it('Should create graoup with proper value', async () => {
      const response = await groupController.create(
        CreateGroupDtoMock(),
        UserRequestMock(),
      );
      TestUtils.expectHasProperties(response, 'name');
    });
  });

  describe('Get function', () => {
    it('Should use getbyuser from groupService', () => {
      const spy = jest.spyOn(groupService, 'getbyuser');
      groupController.get(UserRequestMock());
      expect(spy).toBeCalledTimes(1);
    });

    it('Should return promise', () => {
      const respone = groupController.get(UserRequestMock());
      expect(respone).resolves.toBeDefined();
    });

    it('Should object of group', async () => {
      const respone = await groupController.get(UserRequestMock());
      // TODO: Change to return group
      TestUtils.expectHasProperties(respone, 'name');
    });
  });

  describe('deleteByid', () => {
    it('Should use deleteGroup from groupService', () => {
      const spy = jest.spyOn(groupService, 'deleteGroup');
      groupController.deleteByid(TestDataUtils.getRandomObjectIdAsString());
      expect(spy).toBeCalledTimes(1);
    });

    it('Should use getbyuser from groupService', async () => {
      const spy = jest.spyOn(groupService, 'deleteGroup');
      await groupController.deleteByid(
        TestDataUtils.getRandomObjectIdAsString(),
      );
      expect(spy).toBeCalledTimes(1);
    });

    it('Should return promise', () => {
      const respone = groupController.deleteByid(
        TestDataUtils.getRandomObjectIdAsString(),
      );
      expect(respone).resolves.toBeDefined();
    });
  });
});
