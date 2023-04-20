import { IGroup } from 'src/schemas/Interfaces/group.interface';
import { GroupRepository } from './group.repository';
import { Model } from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { GroupModelMock, groupMock } from '../../test/mock/GroupModelMock';
import { TestUtils } from '../../test/utils/TestUtils';

describe('GroupRepository', () => {
  let groupModel: Model<IGroup>;
  let groupRepo: GroupRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GroupRepository,
        {
          provide: 'GROUP_MODEL',
          useValue: GroupModelMock,
        },
      ],
    }).compile();

    groupModel = module.get<Model<IGroup>>('GROUP_MODEL');
    groupRepo = module.get<GroupRepository>(GroupRepository);
  });

  beforeEach(() => jest.clearAllMocks());

  it('Group model should be defined', () => {
    expect(groupModel).toBeDefined();
  });

  it('Group repo should be defined', () => {
    expect(groupRepo).toBeDefined();
  });

  it('Create method should return proper object', async () => {
    const group = await groupRepo.create({
      toObject: () => ({ ...groupMock() }),
    });
    TestUtils.expectHasProperties(group, 'name', 'userid');
  });
});
