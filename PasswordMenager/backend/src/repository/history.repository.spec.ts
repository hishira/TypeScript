import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model, ObjectId } from 'mongoose';
import { IHistory } from 'src/schemas/Interfaces/history.interface';
import { DTO } from 'src/schemas/dto/object.interface';
import { HistoryRepository } from './history.repository';

// Mocking the mongoose Model
const mockModel = {
  findOne: jest.fn(),
  find: jest.fn(),
  updateOne: jest.fn(),
  save: jest.fn(),
  deleteMany: jest.fn(),
};

describe('HistoryRepository', () => {
  let historyRepository: HistoryRepository;
  let model: Model<IHistory>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HistoryRepository,
        {
          provide: 'HISTORY_MODEL',
          useValue: mockModel,
        },
      ],
    }).compile();

    historyRepository = module.get<HistoryRepository>(HistoryRepository);
    model = module.get<Model<IHistory>>(getModelToken('History'));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new history entry', async () => {
      const historyToSave: DTO = {
        toObject: () => ({ userid: '', groups: [], entry: [] }),
      }; /* create your test history to save */
      const savedHistory: Partial<IHistory> = {
        userid: '' as unknown as ObjectId,
        groups: [],
        entities: [],
      }; /* create your test saved history */
      mockModel.save.mockResolvedValueOnce(savedHistory);

      const result = await historyRepository.create(historyToSave);

      expect((model as any).save).toHaveBeenCalledWith(historyToSave);
      expect(result).toEqual(savedHistory);
    });
  });

  describe('update', () => {
    it('should update a history entry', async () => {
      const partialHistory: Partial<IHistory> = {
        userid: '' as unknown as ObjectId,
        groups: [],
        entities: [],
      };
      const expectedResult: any = {};
      mockModel.updateOne.mockResolvedValueOnce(expectedResult);

      const result = await historyRepository.update(partialHistory);

      expect(model.updateOne).toHaveBeenCalledWith(
        { userid: partialHistory.userid },
        expect.any(Object),
      );
      expect(result).toEqual(expectedResult);
    });
  });

  // Add more test cases for other methods
  // ...

  //   describe('delete', () => {
  //     it('should delete history entries based on the provided filter', async () => {
  //       const deleteOption = /* create your test delete option */;
  //       const expectedResult = /* define your expected result */;
  //       mockModel.deleteMany.mockResolvedValueOnce(expectedResult);

  //       const result = await historyRepository.delete(deleteOption);

  //       expect(model.deleteMany).toHaveBeenCalledWith(deleteOption.getOption());
  //       expect(result).toEqual(expectedResult);
  //     });
  //   });
});
