import { Inject } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { IEntry } from 'src/schemas/Interfaces/entry.interface';
import { EntryRepository } from './entry.repository';
import { EntryMockModel } from '../../test/mock/EntryMock';

describe('EntryRepository', () => {
  let entryModel: Model<IEntry>;
  let entryRepo: EntryRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EntryRepository,

        {
          provide: 'ENTRY_MODEL',
          useValue: EntryMockModel,
        },
      ],
    }).compile();

    entryModel = module.get<Model<IEntry>>('ENTRY_MODEL');
    entryRepo = module.get<EntryRepository>(EntryRepository);
  });
  it('Entry repo should be definied', () => {
    expect(entryRepo).toBeDefined();
  });
  it('while create should use model ', async () => {
    const user = await entryRepo.create({
      toObject: () => ({ name: 'tea', template: 'asd' }),
    });
    expect(user).toHaveProperty('name');
  });
  it('entry repo should use entry module', async () => {
    const spy = jest.spyOn(entryModel, 'findOne').mockReturnValueOnce({
      exec: jest.fn().mockResolvedValueOnce({ name: 'other' }),
    } as any);
    await entryRepo.findById('asd123');
    expect(spy).toBeCalled();
  });
});
