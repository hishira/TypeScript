import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { ImportRequest } from 'src/schemas/Interfaces/importRequest.interface';
import {
  ImporRequestMock,
  exampleImportRequestMock,
  importRequestMock,
} from '../../test/mock/ImportRequestMock';
import { ImportRequestRepository } from './importrequest.repository';
import { Logger } from 'src/utils/Logger';

describe('ImportRequestRepository', () => {
  let importRequestRepository: ImportRequestRepository;
  let model: Model<ImportRequest>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ImportRequestRepository,
        {
          provide: 'IMPORT_REQUEST_MODEL',
          useValue: ImporRequestMock,
        },
        Logger,
      ],
    }).compile();

    importRequestRepository = module.get<ImportRequestRepository>(
      ImportRequestRepository,
    );
    model = module.get<Model<ImportRequest>>('IMPORT_REQUEST_MODEL');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Create', () => {
    it('Should return new import request', async () => {
      const response = await importRequestRepository.create(
        exampleImportRequestMock(),
      );
      expect(response).toBeDefined();
      expect(response).toHaveProperty('userid');
      expect(response).toHaveProperty('entriesToImport');
      expect(response).toHaveProperty('state');
    });
  });
  describe('Find', () => {
    it('Find using only id, should return only one response in array', async () => {
      const response = await importRequestRepository.find({
        getOption: () => ({ _id: 'testId' }),
      });
      expect(response).toBeInstanceOf(Array);
      expect((response as Array<ImportRequest>)?.length).toBe(1);
    });
    it('Find withot id, should return more than one import request', async () => {
      const response = await importRequestRepository.find({
        getOption: () => ({}),
      });
      expect(response).toBeInstanceOf(Array);
      expect((response as Array<ImportRequest>)?.length).toBeGreaterThan(1);
    });
  });
  describe('Update', () => {
    it('Update import request should return updated entry', async () => {
      const response = await importRequestRepository.update(
        importRequestMock(),
      );
      expect(response).toBeDefined();
    });
    it('Update import request should use findOneAndUpdate function from model', async () => {
      const spy = jest.spyOn(model, 'findOneAndUpdate');
      await importRequestRepository.update(importRequestMock());
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Delete', () => {
    it('Should use updateOne funcion from model', async () => {
      const spy = jest.spyOn(model, 'findOneAndUpdate');
      await importRequestRepository.delete({
        getOption: () => ({ _id: 'test-id' }),
      });
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getById ', () => {
    it('should be not implemented', () => {
      expect(importRequestRepository.getById).toThrow(
        'Method not implemented.',
      );
    });
  });
});
