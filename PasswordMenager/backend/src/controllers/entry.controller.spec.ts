import { CanActivate } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { GroupGuard } from 'src/guards/GroupExists.guard';
import { EntryRepository } from 'src/repository/entry.repository';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { EntryService } from 'src/services/entry.service';
import { CreateEntryDtoMock, EntryMockModel } from '../../test/mock/EntryMock';
import { TestDataUtils } from '../../test/utils/TestDataUtils';
import { TestUtils } from '../../test/utils/TestUtils';
import { EntryContoller } from './entry.controller';

class MockGroupGuard implements CanActivate {
  canActivate() {
    return true;
  }
}
describe('EntryController', () => {
  let entryController: EntryContoller;
  let entryService: EntryService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EntryContoller],
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
    })
      .overrideGuard(GroupGuard)
      .useClass(MockGroupGuard)
      .compile();
    entryController = module.get<EntryContoller>(EntryContoller);
    entryService = module.get<EntryService>(EntryService);
  });

  beforeEach(() => jest.clearAllMocks());

  describe('Should be defined', () => {
    it('Entry controller should be defined', () => {
      expect(entryController).toBeDefined();
    });
    it('Entry service should be defined', () => {
      expect(entryService).toBeDefined();
    });
  });

  describe('Create function', () => {
    it('Should use create function from entry service', async () => {
      const spy = jest.spyOn(entryService, 'create');
      await entryController.create(CreateEntryDtoMock(), {
        user: { _id: TestDataUtils.getRandomObjectIdAsString() },
      });
      expect(spy).toBeCalledTimes(1);
    });

    it('Should return object', async () => {
      const entryCreateRespone = await entryController.create(
        CreateEntryDtoMock(),
        {
          user: { _id: TestDataUtils.getRandomObjectIdAsString() },
        },
      );
      expect(entryCreateRespone).toBeDefined();
    });

    it('Should returned object have entry property', async () => {
      const entryCreateRespone = await entryController.create(
        CreateEntryDtoMock(),
        {
          user: { _id: TestDataUtils.getRandomObjectIdAsString() },
        },
      );
      TestUtils.expectHasProperties(
        entryCreateRespone,
        'username',
        'title',
        'password',
        'groupid',
      );
    });
  });
});
