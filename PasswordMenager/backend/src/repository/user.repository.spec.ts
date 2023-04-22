import { IUser } from 'src/schemas/Interfaces/user.interface';
import { UserRepository } from './user.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { UserModelMock } from '../../test/mock/UserModelMock';
import { Model } from 'mongoose';

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
});
