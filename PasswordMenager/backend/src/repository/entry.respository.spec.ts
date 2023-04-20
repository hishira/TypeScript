import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { IEntry } from 'src/schemas/Interfaces/entry.interface';
import { EntryMockModel, entryMock } from '../../test/mock/EntryMock';
import { TestUtils } from '../../test/utils/TestUtils';
import { EntryRepository } from './entry.repository';

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

  beforeEach(() => jest.clearAllMocks());
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

    TestUtils.expectHasProperties(
      user,
      'title',
      'username',
      'password',
      'note',
    );
  });

  it('Created entry should have meta, with specific properties', async () => {
    const user = await entryRepo.create({
      toObject: () => ({ ...entryMock() }),
    });
    TestUtils.expectHasProperties(user, 'meta');
    TestUtils.expectHasProperties(
      user.meta,
      'lastNote',
      'lastPassword',
      'lastTitle',
      'lastUsername',
      'lastEditedVariable',
    );
  });

  it('findById should use findOne from model', async () => {
    const spy = jest.spyOn(entryModel, 'findOne').mockReturnValueOnce({
      exec: jest.fn().mockResolvedValueOnce({ name: 'other' }),
    } as any);
    await entryRepo.findById('asd123');
    expect(spy).toBeCalled();
  });

  it('find should use find from model', async () => {
    const spy = jest.spyOn(entryModel, 'find').mockReturnValueOnce({
      exec: jest.fn().mockResolvedValueOnce({ name: 'other' }),
    } as any);
    await entryRepo.find({
      getOption() {
        return { _id: 'asd123' };
      },
    });
    expect(spy).toBeCalled();
  });

  it('delete functions should use delete', async () => {
    const spy = jest.spyOn(entryModel, 'deleteMany').mockReturnValueOnce({
      exec: jest.fn().mockResolvedValueOnce(Promise.resolve(true)),
    } as any);
    await entryRepo.delete({
      getOption() {
        return { _id: 'asd' };
      },
    });
    expect(spy).toBeCalled();
  });

  it('delete by id should use model function findByIdAndDelete', async () => {
    const spy = jest.spyOn(entryModel, 'findByIdAndDelete');

    await entryRepo.deleteById('cd');
    expect(spy).toBeCalledTimes(1);
  });

  it('On update repo should use createEditentity function', async () => {
    const spy = jest.spyOn(entryRepo as any, 'createEditentity');
    await entryRepo.update({ username: 'ads', _id: 'asd' });
    expect(spy).toBeCalledTimes(1);
  });

  it('On update model should use findById', async () => {
    const spy = jest.spyOn(entryModel, 'findById');
    await entryRepo.update({ username: 'ads', _id: 'asd' });
    expect(spy).toBeCalledTimes(1);
  });

  it('On update model should use updateOne', async () => {
    const spy = jest.spyOn(entryModel, 'updateOne');
    await entryRepo.update({ username: 'ads', _id: 'asd' });
    expect(spy).toBeCalledTimes(1);
  });

  it('getById should not be implemented', async () => {
    expect(entryRepo.getById).toThrow('Method not implemented.');
  });
});
