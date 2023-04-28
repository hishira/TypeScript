import { Test, TestingModule } from '@nestjs/testing';
import { EntryRepository } from 'src/repository/entry.repository';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { EntryService } from 'src/services/entry.service';
import { EntryMockModel } from '../../test/mock/EntryMock';
import { EntryContoller } from './entry.controller';
import { CanActivate } from '@nestjs/common';
import { GroupGuard } from 'src/guards/GroupExists.guard';

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
});
