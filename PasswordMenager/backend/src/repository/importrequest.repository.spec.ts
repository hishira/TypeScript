import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { ImportRequest } from 'src/schemas/Interfaces/importRequest.interface';
import { ImporRequestMock } from '../../test/mock/ImportRequestMock';
import { ImportRequestRepository } from './importrequest.repository';

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
      const response = await importRequestRepository.create({
        toObject: () => ({
          userid: 'test-id-user',
          entriesToImport: [],
        }),
      });
      expect(response).toBeDefined();
    });
  });
});
