import { Test, TestingModule } from '@nestjs/testing';
import { UpdateUserCommand } from 'src/commands/user/UpdateUserCommand';
import { UserRepository } from 'src/repository/user.repository';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { UserModelMock } from '../../../../test/mock/UserModelMock';
import { UpdateUserHandler } from './updateUserHandler';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Logger } from 'src/utils/Logger';

describe('updateUserHandler', () => {
  let updateUserHandler: UpdateUserHandler;
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
        {
          provide: EventEmitter2,
          useValue: {
            emit: jest.fn(),
            emitAsync: jest.fn(),
          },
        },
        Logger,
        UpdateUserHandler,
      ],
    }).compile();
    updateUserHandler = module.get<UpdateUserHandler>(UpdateUserHandler);
    userRepository = module.get<UserRepository>(Repository);
  });
  beforeEach(() => jest.clearAllMocks());
  describe('Handler', () => {
    it('Should be defined', () => {
      expect(updateUserHandler).toBeDefined();
    });
  });
  describe('Update user command handler', () => {
    it('should return promise', () => {
      const response = updateUserHandler.execute(
        new UpdateUserCommand('test-id', {
          email: 'test@test.com',
          login: 'test',
          password: '123456',
        }),
      );
      expect(response).toBeDefined();
      expect(response).toBeInstanceOf(Promise);
    });
    it('should use update function from repository', async () => {
      const spy = jest.spyOn(userRepository, 'update');
      await updateUserHandler.execute(
        new UpdateUserCommand('test-id', {
          email: 'test@test.com',
          login: 'test',
          password: '123456',
        }),
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
    it('should return IUser', async () => {
      const response = await updateUserHandler.execute(
        new UpdateUserCommand('test-id', {
          email: 'test@test.com',
          login: 'test',
          password: '123456',
        }),
      );
      expect(response).toBeDefined();
      expect(response).toHaveProperty('_id');
      expect(response).toHaveProperty('login');
      expect(response).toHaveProperty('password');
    });

    it('should use private function getPreparedPartialUpdateUser', async () => {
      const spy = jest.spyOn(
        updateUserHandler as any,
        'getPreparedPartialUpdateUser',
      );
      await updateUserHandler.execute(
        new UpdateUserCommand('test-id', {
          email: 'test@test.com',
          login: 'test',
          password: '123456',
        }),
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
