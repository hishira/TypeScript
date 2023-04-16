import { Model } from 'mongoose';
import { EntryRepository } from './entry.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { IEntry } from 'src/schemas/Interfaces/entry.interface';
import { Repository } from '../schemas/Interfaces/repository.interface';

describe('EntryRepository', () => {
  let entryModel: Model<IEntry>;
  let entryRepo: EntryRepository;

  function MockRepo() {
    this.create = () => null;
  }

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EntryRepository,

        {
          provide: getModelToken('ENTRY_MODEL'),
          useValue: new MockRepo(),
        },
        {
          provide: 'ENTRY_MODEL',
          useValue: new MockRepo(),
        },
      ],
    }).compile();

    entryModel = module.get<Model<IEntry>>(getModelToken('ENTRY_MODEL'));
    entryRepo = module.get<EntryRepository>(EntryRepository);
  });
  it('Entry repo should be definied', () => {
    expect(entryRepo).toBeDefined();
  });
});
