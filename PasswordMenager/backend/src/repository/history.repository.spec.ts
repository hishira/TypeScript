import { Test, TestingModule } from '@nestjs/testing';
import { Model, ObjectId } from 'mongoose';
import { IHistory } from 'src/schemas/Interfaces/history.interface';
import { DTO } from 'src/schemas/dto/object.interface';
import { HistoryMockData } from '../../test/mock/HistoryMock';
import { HistoryRepository } from './history.repository';
import { Logger } from 'src/utils/Logger';

describe('HistoryRepository', () => {
  let historyRepository: HistoryRepository;
  let model: Model<IHistory>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HistoryRepository,
        {
          provide: 'HISTORY_MODEL',
          useValue: HistoryMockData,
        },
        Logger,
      ],
    }).compile();

    historyRepository = module.get<HistoryRepository>(HistoryRepository);
    model = module.get<Model<IHistory>>('HISTORY_MODEL');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new history entry', async () => {
      const historyToSave: DTO = {
        toObject: () => ({ userid: '', groups: [], entry: [] }),
      }; /* create your test history to save */

      const result = await historyRepository.create(historyToSave);

      expect(result).toBeDefined();
    });
  });

  describe('update', () => {
    it('should update a history entry', async () => {
      const spy = jest.spyOn(model, 'findOneAndUpdate');
      const partialHistory: Partial<IHistory> = {
        userid: '' as unknown as ObjectId,
        groups: [],
        entities: [],
      };
      await historyRepository.update(partialHistory);
      expect(spy).toBeCalled();
    });
  });

  describe('find', () => {
    it('should be not implemented', async () => {
      expect(historyRepository.find).toThrow('Method not implemented.');
    });
  });

  describe('getbyId', () => {
    it('should be not implemented', async () => {
      expect(historyRepository.getById).toThrow('Method not implemented.');
    });
  });
});
