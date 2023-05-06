import { Test, TestingModule } from '@nestjs/testing';
import { Archiver } from 'archiver';
import { Model } from 'mongoose';
import { EntryRepository } from 'src/repository/entry.repository';
import { IEntry } from 'src/schemas/Interfaces/entry.interface';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { EntryMockModel, entryMock } from '../../test/mock/EntryMock';
import { TestDataUtils } from '../../test/utils/TestDataUtils';
import { TestUtils } from '../../test/utils/TestUtils';
import { EntryService } from './entry.service';
import { ExportService } from './export.service';

describe('ExportService', () => {
  let entryService: EntryService;
  let exportService: ExportService;
  let entryModel: Model<IEntry>;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExportService,
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
    }).compile();
    entryModel = module.get<Model<IEntry>>('ENTRY_MODEL');
    // TODO rewrite find to return array !important
    jest.spyOn(entryModel, 'find').mockReturnValue({
      exec: () => Promise.resolve([entryMock]),
    } as any);
    entryService = module.get<EntryService>(EntryService);
    exportService = module.get<ExportService>(ExportService);
  });

  beforeEach(() => jest.clearAllMocks());

  describe('Should be defined', () => {
    it('EntryService should be defined', () => {
      expect(entryService).toBeDefined();
    });

    it('ExportService should be defined', () => {
      expect(exportService).toBeDefined();
    });
  });

  describe('getCsvFile', () => {
    it('Should use getByUser from entryService', () => {
      const spy = jest.spyOn(entryService, 'getByUser');
      exportService.getCsvFile(TestDataUtils.getRandomObjectIdAsString());
      expect(spy).toBeCalledTimes(1);
    });

    it('Should return promise', () => {
      const response = exportService.getCsvFile(
        TestDataUtils.getRandomObjectIdAsString(),
      );
      expect(response).resolves.toBeDefined();
    });

    it('should return string', async () => {
      const response = await exportService.getCsvFile(
        TestDataUtils.getRandomObjectIdAsString(),
      );

      TestUtils.checkTypeOfValue(response, 'string');
    });
  });

  describe('getCsvZipedFile', () => {
    it('Should use getByUser from entryService', () => {
      const spy = jest.spyOn(entryService, 'getByUser');
      exportService.getCsvZipedFile(TestDataUtils.getRandomObjectIdAsString());
      expect(spy).toBeCalledTimes(1);
    });

    it('Should return promise', () => {
      const response = exportService.getCsvZipedFile(
        TestDataUtils.getRandomObjectIdAsString(),
      );
      expect(response).resolves.toBeDefined();
    });

    it('Should retunr instance of Archiver', async () => {
      const response = await exportService.getCsvZipedFile(
        TestDataUtils.getRandomObjectIdAsString(),
      );
      TestUtils.isInstanceOfArchiver(response);
    });
  });
});
