import { Test, TestingModule } from '@nestjs/testing';
import { ImportController } from './import.controller';

describe('ImportController', () => {
  let importController: ImportController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImportController],
    }).compile();
    importController = module.get<ImportController>(ImportController);
  });
  beforeEach(() => jest.clearAllMocks());
  describe('Defined', () => {
    it('Import controller should be defined', () => {
      expect(importController).toBeDefined();
    });
  });

  describe('uploadFile', () => {
    it('Should not be defined method', () => {
      expect(() => importController.uploadFile(null)).toThrow(Error);
    });
  });
});
