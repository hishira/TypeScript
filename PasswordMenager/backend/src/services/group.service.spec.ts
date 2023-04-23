import { Test, TestingModule } from '@nestjs/testing';
import { GroupService } from './group.service';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { GroupRepository } from 'src/repository/group.repository';
import { GroupModelMock } from '../../test/mock/GroupModelMock';
import { EntryService } from './entry.service';
import { EntryMockModel } from '../../test/mock/EntryMock';
import { EntryRepository } from 'src/repository/entry.repository';

describe('GroupService', () => {
  let groupService: GroupService;

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
  });

  beforeEach(() => jest.clearAllMocks());

  it('Group service should be defined', () => {
    expect(groupService).toBeDefined();
  });
});
