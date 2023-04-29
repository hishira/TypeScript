import { Test, TestingModule } from '@nestjs/testing';
import { EntryRepository } from 'src/repository/entry.repository';
import { GroupRepository } from 'src/repository/group.repository';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { EntryService } from 'src/services/entry.service';
import { GroupService } from 'src/services/group.service';
import { TestUtils } from '../../test/utils/TestUtils';
import { EntryMockModel } from '../../test/mock/EntryMock';
import {
  CreateGroupDtoMock,
  GroupModelMock,
} from '../../test/mock/GroupModelMock';
import { UserRequestMock } from '../../test/mock/UserModelMock';
import { GroupController } from './group.controller';

describe('GroupController', () => {
  let groupController: GroupController;
  let groupService: GroupService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupController],
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

    groupController = module.get<GroupController>(GroupController);
    groupService = module.get<GroupService>(GroupService);
  });
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
});
