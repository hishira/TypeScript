import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { GetFilteredUserQueryHandler } from 'src/handlers/queries/user/getFilteredUserhandler.queries';
import { UserRepository } from 'src/repository/user.repository';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { AuthService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';
import {
  AuthInfoMock,
  CreateUserDtoMock,
  UserModelMock,
  UserRequestMock,
  userMock,
} from '../../test/mock/UserModelMock';
import { TestUtils } from '../../test/utils/TestUtils';
import { AuthController } from './auth.controller';

describe('AuthController', () => {
  let authController: AuthController;
  let userService: UserService;
  let userRepository: UserRepository;
  let authService: AuthService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        UserService,
        GetFilteredUserQueryHandler,
        AuthService,
        JwtService,
        {
          provide: QueryBus,
          useValue: {
            execute: () => Promise.resolve(userMock()),
          },
        },
        {
          provide: CommandBus,
          useValue: {
            execute: () => Promise.resolve(userMock()),
          },
        },
        {
          provide: EventEmitter2,
          useValue: {
            emit: jest.fn(),
            emitAsync: (...params) => userMock(),
          },
        },
        {
          provide: Repository,
          useClass: UserRepository,
        },
        {
          provide: 'USER_MODEL',
          useValue: UserModelMock,
        },
      ],
    }).compile();
    authController = module.get<AuthController>(AuthController);
    userService = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(Repository);
    authService = module.get<AuthService>(AuthService);
  });

  beforeEach(() => jest.clearAllMocks());
  describe('Controller should be defined', () => {
    it('Auth controller should be defined', () => {
      expect(authController).toBeDefined();
    });

    it('User service should be defined', () => {
      expect(userService).toBeDefined();
    });

    it('User repository should be defined', () => {
      expect(userRepository).toBeDefined();
    });

    it('Auth service should be defined', () => {
      expect(authService).toBeDefined();
    });
  });

  describe('Create method', () => {
    it('Should use auth service create method', async () => {
      const spy = jest.spyOn(authService, 'createUser');

      await authController.create(CreateUserDtoMock());

      expect(spy).toBeCalledTimes(1);
    });

    it('Method should return promise', () => {
      const user = authController.create(CreateUserDtoMock());

      expect(user).toBeInstanceOf(Promise);
    });

    it('Method should return as async object user', async () => {
      const user = await authController.create(CreateUserDtoMock());

      TestUtils.expectHasProperties(user, 'login', 'password');
    });
  });

  describe('Login method', () => {
    it('Should use authService create login', async () => {
      const spy = jest.spyOn(authService, 'login');

      await authController.login(AuthInfoMock(), UserRequestMock());

      expect(spy).toBeCalledTimes(1);
    });

    it('Should return object', async () => {
      const respone = await authController.login(
        AuthInfoMock(),
        UserRequestMock(),
      );
      expect(respone).toBeDefined();
    });
    it('Should return authentication object', async () => {
      const respone = await authController.login(
        AuthInfoMock(),
        UserRequestMock(),
      );
      TestUtils.expectHasProperties(respone, 'access_token', 'refresh_token');
    });
  });

  describe('Refresh method', () => {
    it('Should use authService function refreshaccesstoken', async () => {
      const spy = jest.spyOn(authService, 'refreshaccesstoken');

      await authController.refresh(UserRequestMock());

      expect(spy).toBeCalledTimes(1);
    });

    it('Should return object', async () => {
      const respone = await authController.refresh(UserRequestMock());
      expect(respone).toBeDefined();
    });
    it('Should return authentication object', async () => {
      const respone = await authController.refresh(UserRequestMock());
      TestUtils.expectHasProperties(respone, 'access_token');
    });
  });
});
