import { Inject } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { IEntry } from 'src/schemas/Interfaces/entry.interface';
import { EntryRepository } from './entry.repository';
import { EntryMockModel, entryMock } from '../../test/mock/EntryMock';

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

  it('Entry model should be defined', () => {
    expect(entryModel).toBeDefined();
  });

  it('Entry repo should be definied', () => {
    expect(entryRepo).toBeDefined();
  });

  it('Created entry should have default entry property:  username, password, note and title', async () => {
    const user = await entryRepo.create({
      toObject: () => ({ ...entryMock() }),
    });
    expect(user).toHaveProperty('title');
    expect(user).toHaveProperty('username');
    expect(user).toHaveProperty('password');
    expect(user).toHaveProperty('note');
  });

  it('Created entry should have meta, with specific properties', async () => {
    const user = await entryRepo.create({
      toObject: () => ({ ...entryMock() }),
    });
    expect(user).toHaveProperty('meta');
    expect(user.meta).toHaveProperty('lastNote');
    expect(user.meta).toHaveProperty('lastPassword');
    expect(user.meta).toHaveProperty('lastTitle');
    expect(user.meta).toHaveProperty('lastUsername');
    expect(user.meta).toHaveProperty('lastEditedVariable');
  });

  it('entry repo should use entry module', async () => {
    const spy = jest.spyOn(entryModel, 'findOne').mockReturnValueOnce({
      exec: jest.fn().mockResolvedValueOnce({ name: 'other' }),
    } as any);
    await entryRepo.findById('asd123');
    expect(spy).toBeCalled();
  });
});
