import { Test, TestingModule } from '@nestjs/testing';
import { EntryRepository } from 'src/repository/entry.repository';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { EntryMockModel } from '../../test/mock/EntryMock';
import { EntryService } from './entry.service';
import { ExportService } from './export.service';

describe('ExportService', () => {
  let entryService: EntryService;
  let exportService: ExportService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EntryService,
        ExportService,
        {
          provide: Repository,
          useValue: EntryRepository,
        },
        {
          provide: 'ENTRY_MODEL',
          useValue: EntryMockModel,
        },
      ],
    }).compile();
    entryService = module.get<EntryService>(EntryService);
    exportService = module.get<ExportService>(ExportService);
  });
  describe('Should be defined', () => {
    it('EntryService should be defined', () => {
      expect(entryService).toBeDefined();
    });

    it('ExportService should be defined', () => {
      expect(exportService).toBeDefined();
    });
  });
});
