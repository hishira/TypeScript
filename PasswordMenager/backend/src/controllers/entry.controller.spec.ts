import { CanActivate } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Test, TestingModule } from '@nestjs/testing';
import { GroupGuard } from 'src/guards/GroupExists.guard';
import { EntryRepository } from 'src/repository/entry.repository';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { EntryService } from 'src/services/entry.service';
import { ExportService } from 'src/services/export.service';
import {
  CreateEntryDtoMock,
  EditEntryDtoMock,
  EntryMockModel,
  entryMock,
} from '../../test/mock/EntryMock';
import { TestDataUtils } from '../../test/utils/TestDataUtils';
import { TestUtils } from '../../test/utils/TestUtils';
import { EntryContoller } from './entry.controller';
import { IEntry } from 'src/schemas/Interfaces/entry.interface';
import { Logger } from 'src/utils/Logger';

class MockGroupGuard implements CanActivate {
  canActivate(): boolean {
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
        ExportService,
        {
          provide: EventEmitter2,
          useValue: {
            emit: jest.fn(),
          },
        },
        {
          provide: QueryBus,
          useValue: {
            execute: (...params): Promise<IEntry> =>
              Promise.resolve(entryMock()),
          },
        },
        {
          provide: CommandBus,
          useValue: {
            execute: (...params): Promise<IEntry> =>
              Promise.resolve(entryMock()),
          },
        },
        {
          provide: Repository,
          useClass: EntryRepository,
        },
        Logger,
        {
          provide: EventEmitter2,
          useValue: {
            emit: jest.fn(),
            emitAsync: jest.fn(),
          },
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

  describe('getbygroupid function', () => {
    it('should use getbygroupid from entry service', async () => {
      const spy = jest.spyOn(entryService, 'getUserEntriesBy');
      await entryController.getByGroup(
        { user: { _id: 'test-id' } },
        { paginator: { page: 0 } },
      );

      expect(spy).toBeCalledTimes(1);
    });

    it('Returned object should be defined', async () => {
      const response = entryController.getByGroup(
        { user: { _id: 'test-id' } },
        { paginator: { page: 0 } },
      );
      expect(response).resolves.toBeDefined();
    });
  });

  describe('getEntryById function', () => {
    it('should use getById from entry service', async () => {
      const spy = jest.spyOn(entryService, 'getById');
      await entryController.getEntryById(
        TestDataUtils.getRandomObjectIdAsString(),
      );

      expect(spy).toBeCalledTimes(1);
    });

    it('Returned object should be defined', async () => {
      const response = entryController.getEntryById(
        TestDataUtils.getRandomObjectIdAsString(),
      );
      expect(response).resolves.toBeDefined();
    });

    it('Returner object should be entry', async () => {
      const response = await entryController.getEntryById(
        TestDataUtils.getRandomObjectIdAsString(),
      );
      TestUtils.expectHasProperties(
        response,
        'username',
        'title',
        'password',
        'groupid',
      );
    });

    describe('deletebyid function', () => {
      it('should use deletebyid function from service', async () => {
        const spy = jest.spyOn(entryService, 'deletebyid');
        await entryController.deletebyid(
          TestDataUtils.getRandomObjectIdAsString(),
        );

        expect(spy).toBeCalledTimes(1);
      });

      it('should return promise', async () => {
        const response = entryController.deletebyid(
          TestDataUtils.getRandomObjectIdAsString(),
        );

        expect(response).resolves.toBeDefined();
      });

      it('shuld return delete object', async () => {
        const response = await entryController.deletebyid(
          TestDataUtils.getRandomObjectIdAsString(),
        );

        TestUtils.expectHasProperties(response.response, '_id', 'groupid');
      });
    });
    describe('editentry function', () => {
      it('should use editentry function from service', async () => {
        const spy = jest.spyOn(entryService, 'editentry');
        await entryController.editentry(EditEntryDtoMock(), null);

        expect(spy).toBeCalledTimes(1);
      });

      it('should return promise', async () => {
        const response = entryController.editentry(EditEntryDtoMock(), null);
        expect(response).resolves.toBeDefined();
      });

      it('shuld return delete object', async () => {
        const response = await entryController.editentry(
          EditEntryDtoMock(),
          null,
        );

        TestUtils.expectHasProperties(response, 'status', 'respond');
      });
    });
  });
});
