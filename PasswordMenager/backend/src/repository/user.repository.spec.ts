import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { IUser } from 'src/schemas/Interfaces/user.interface';
import { UserModelMock, userMock } from '../../test/mock/UserModelMock';
import { TestUtils } from '../../test/utils/TestUtils';
import { UserRepository } from './user.repository';
import { Logger } from 'src/utils/Logger';

describe('UserRepository', () => {
  let userModel: Model<IUser>;
  let userRepo: UserRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: 'USER_MODEL',
          useValue: UserModelMock,
        },
        Logger,
      ],
    }).compile();

    userModel = module.get<Model<IUser>>('USER_MODEL');
    userRepo = module.get<UserRepository>(UserRepository);
  });

  beforeEach(() => jest.clearAllMocks());

  it('User model should be defined', () => {
    expect(userModel).toBeDefined();
  });

  it('User repo should be defined', () => {
    expect(userRepo).toBeDefined();
  });

  it('Create method should return proper object', async () => {
    const user = await userRepo.create({
      toObject: () => ({ ...userMock() }),
    });

    TestUtils.expectHasProperties(user, 'login', 'password');
  });

  it('Create method should return proper object with meta', async () => {
    const user = await userRepo.create({
      toObject: () => ({ ...userMock() }),
    });

    TestUtils.expectHasProperties(user, 'meta');
    TestUtils.expectHasProperties(
      (user as IUser).meta,
      'lastLogin',
      'lastPassword',
      'crateDate',
      'firstEditDate',
      'editDate',
    );
  });

  it('Find method should use group model find', async () => {
    const spy = jest.spyOn(userModel, 'find');
    await userRepo.find({
      getOption() {
        return { _id: '' };
      },
    });

    expect(spy).toBeCalled();
  });

  it('Find by id method should use group model findById', async () => {
    const spy = jest.spyOn(userModel, 'findById');
    await userRepo.findById('123');

    expect(spy).toBeCalled();
  });

  it('Find method should return group', async () => {
    const group = await userRepo.find({
      getOption() {
        return { _id: '' };
      },
    });

    TestUtils.expectHasProperties(group[0], 'login', 'password');
  });

  it('FindById method should return group', async () => {
    const group = await userRepo.findById('asd');

    TestUtils.expectHasProperties(group, 'login', 'password');
  });

  it('Update method should use findById', async () => {
    const spy = jest.spyOn(userModel, 'findById');
    await userRepo.update({ _id: '123', login: 'asd', password: 'asd' });

    expect(spy).toBeCalledTimes(1);
  });

  it('Uptdate method should use findById method', async () => {
    const spy = jest.spyOn(userModel, 'findOneAndUpdate');
    await userRepo.update({ _id: '123', login: 'asd', password: 'asd' });

    expect(spy).toBeCalledTimes(1);
  });

  it('Uptdate method should use updateUserHandle method', async () => {
    const spy = jest.spyOn(userRepo as any, 'updateUserHandle');
    await userRepo.update({ _id: '123', login: 'asd', password: 'asd' });

    expect(spy).toBeCalledTimes(1);
  });

  it('Uptdate method should use createUserObject method', async () => {
    const spy = jest.spyOn(userRepo as any, 'createUserObject');
    await userRepo.update({ _id: '123', login: 'asd', password: 'asd' });

    expect(spy).toBeCalledTimes(1);
  });

  it('Delete method should use model deleteOne function', async () => {
    const spy = jest.spyOn(userModel, 'findOneAndDelete');

    await userRepo.delete({
      getOption() {
        return { _id: 'asd' };
      },
    });

    expect(spy).toBeCalledTimes(1);
  });

  it('getById method should not me implemented', () => {
    expect(userRepo.getById).toThrow('Method not implemented.');
  });
});
