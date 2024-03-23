import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Test, TestingModule } from '@nestjs/testing';
import { ImportRequestState } from 'src/schemas/importRequest.schema';
import { ImportService } from 'src/services/import.service';
import { importRequestMock } from '../../test/mock/ImportRequestMock';
import { ImportController } from './import.controller';

describe('ImportController', () => {
  let importController: ImportController;
  let importService: ImportService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImportController],
      providers: [
        ImportService,
        {
          provide: EventEmitter2,
          useValue: {
            emitAsync: jest.fn(),
          },
        },
        {
          provide: QueryBus,
          useValue: {
            execute: () => Promise.resolve(importRequestMock()),
          },
        },
        {
          provide: CommandBus,
          useValue: {
            execute: () => Promise.resolve(importRequestMock()),
          },
        },
      ],
    }).compile();
    importController = module.get<ImportController>(ImportController);
    importService = module.get<ImportService>(ImportService);
  });
  beforeEach(() => jest.clearAllMocks());
  describe('Defined', () => {
    it('Import controller should be defined', () => {
      expect(importController).toBeDefined();
    });
  });

  describe('getImportRequests', () => {
    it('Should use getUserImportRequest from service', async () => {
      const spy = jest.spyOn(importService, 'getUserImportRequest');
      await importController.getImportRequests({ user: { _id: 'test_id' } });
      expect(spy).toBeCalledTimes(1);
    });
  });
  describe('activateImportRequest', () => {
    it('Should use activateImportRequest from service', async () => {
      const spy = jest.spyOn(importService, 'activateImportRequest');
      await importController.activateImportRequest(
        { user: { _id: 'test_id' } },
        'id',
      );
      expect(spy).toBeCalledTimes(1);
    });
  });
  describe('deleteImportRequest', () => {
    it('Should use deleteImportRequest from service', async () => {
      const spy = jest.spyOn(importService, 'deleteImportRequest');
      await importController.deleteImportRequest('id');
      expect(spy).toBeCalledTimes(1);
    });
  });
  describe('updateImportRequest', () => {
    it('Should use editImpoerRequest from service', async () => {
      const spy = jest.spyOn(importService, 'editImpoerRequest');
      await importController.updateImportRequest('testid', {
        userid: 'test',
        created: 'test',
        state: ImportRequestState.Active,
        entriesToImport: [],
      });
      expect(spy).toBeCalledTimes(1);
    });
  });
  // TODO: checkCsvFile and checkJsonFile
});
