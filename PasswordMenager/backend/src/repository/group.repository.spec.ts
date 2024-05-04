import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { IGroup } from 'src/schemas/Interfaces/group.interface';
import { GroupModelMock, groupMock } from '../../test/mock/GroupModelMock';
import { TestUtils } from '../../test/utils/TestUtils';
import { GroupRepository } from './group.repository';
import { Logger } from 'src/utils/Logger';

describe('GroupRepository', () => {
  let groupModel: Model<IGroup>;
  let groupRepo: GroupRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GroupRepository,
        {
          provide: 'GROUP_MODEL',
          useValue: GroupModelMock,
        },
        Logger,
      ],
    }).compile();

    groupModel = module.get<Model<IGroup>>('GROUP_MODEL');
    groupRepo = module.get<GroupRepository>(GroupRepository);
  });

  beforeEach(() => jest.clearAllMocks());

  it('Group model should be defined', () => {
    expect(groupModel).toBeDefined();
  });

  it('Group repo should be defined', () => {
    expect(groupRepo).toBeDefined();
  });

  it('Create method should return proper object', async () => {
    const group = await groupRepo.create({
      toObject: () => ({ ...groupMock() }),
    });
    TestUtils.expectHasProperties(group, 'name', 'userid');
  });

  it('Find method should use group model find', async () => {
    const spy = jest.spyOn(groupModel, 'find');
    await groupRepo.find({
      getOption() {
        return { _id: '' };
      },
    });

    expect(spy).toBeCalled();
  });

  it('Find by id method should use group model findOne', async () => {
    const spy = jest.spyOn(groupModel, 'findOne');
    await groupRepo.findById('123');

    expect(spy).toBeCalled();
  });

  it('Find method should return group', async () => {
    const group = await groupRepo.find({
      getOption() {
        return { _id: '' };
      },
    });

    TestUtils.expectHasProperties(group[0], 'name', 'userid');
  });

  it('FindById method should return group', async () => {
    const group = await groupRepo.findById('asd');

    TestUtils.expectHasProperties(group, 'name', 'userid');
  });

  it('Uptdate method should use findById and findByIdAndUpdate method', async () => {
    const spy = jest.spyOn(groupModel, 'findById');
    const otherSpy = jest.spyOn(groupModel, 'findByIdAndUpdate');

    await groupRepo.update({ _id: '123', name: 'asdasd' });

    expect(spy).toBeCalledTimes(1);
    expect(otherSpy).toBeCalledTimes(1);
  });

  it('Delete method should use model deleteOne function', async () => {
    const spy = jest.spyOn(groupModel, 'findOneAndDelete');

    await groupRepo.delete({
      getOption() {
        return { _id: 'asd' };
      },
    });

    expect(spy).toBeCalledTimes(1);
  });

  it('getById method should not me implemented', () => {
    expect(groupRepo.getById).toThrow('Method not implemented.');
  });
});
