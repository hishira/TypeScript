import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserCommand } from 'src/commands/user/CreateUserCommand';
import { UserRepository } from 'src/repository/user.repository';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { UserModelMock } from '../../../../test/mock/UserModelMock';
import { CreateUserHandler } from './createUserHandler';

describe('createUserCommandHandler', () => {
  let createUserHandler: CreateUserHandler;
  let userRepository: UserRepository;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: Repository,
          useClass: UserRepository,
        },
        {
          provide: 'USER_MODEL',
          useValue: UserModelMock,
        },
        CreateUserHandler,
      ],
    }).compile();
    createUserHandler = module.get<CreateUserHandler>(CreateUserHandler);
    userRepository = module.get<UserRepository>(Repository);
  });
  beforeEach(() => jest.clearAllMocks());
  describe('Handler', () => {
    it('Should be defined', () => {
      expect(createUserHandler).toBeDefined();
    });
  });
  describe('Create user command handler', () => {
    it('should return promise', () => {
      const response = createUserHandler.execute(
        new CreateUserCommand({
          email: 'test@test.com',
          login: 'test',
          password: '123456',
        }),
      );
      expect(response).toBeDefined();
      expect(response).toBeInstanceOf(Promise);
    });
    it('should use create function from repository', async () => {
      const spy = jest.spyOn(userRepository, 'create');
      await createUserHandler.execute(
        new CreateUserCommand({
          email: 'test@test.com',
          login: 'test',
          password: '123456',
        }),
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
    it('should return IUser', async () => {
      const response = await createUserHandler.execute(
        new CreateUserCommand({
          email: 'test@test.com',
          login: 'test',
          password: '123456',
        }),
      );
      expect(response).toBeDefined();
      expect(response).toHaveProperty('_id');
      expect(response).toHaveProperty('email');
      expect(response).toHaveProperty('login');
      expect(response).toHaveProperty('password');
    });
  });
});
