import { QueryBus } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { GetFilteredUserQueryHandler } from 'src/handlers/queries/user/getFilteredUserhandler.queries';
import { UserRepository } from 'src/repository/user.repository';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import {
  AuthInfoMock,
  UserModelMock,
  userMock,
} from '../../test/mock/UserModelMock';
import { TestUtils } from '../../test/utils/TestUtils';
import { AuthService } from './auth.service';
import { IUser } from 'src/schemas/Interfaces/user.interface';
import { Logger } from 'src/utils/Logger';

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;
  let userRepository: UserRepository;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetFilteredUserQueryHandler,
        AuthService,
        JwtService,
        {
          provide: QueryBus,
          useValue: {
            execute: (): Promise<IUser> => Promise.resolve(userMock()),
          },
        },
        {
          provide: Repository,
          useClass: UserRepository,
        },
        {
          provide: EventEmitter2,
          useValue: {
            emit: jest.fn(),
          },
        },
        {
          provide: 'USER_MODEL',
          useValue: UserModelMock,
        },
        Logger,
      ],
    }).compile();
    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    userRepository = module.get<UserRepository>(Repository);
  });

  beforeEach(() => jest.clearAllMocks());
  describe('Services should be defined', () => {
    it('Auth service should be defined', () => {
      expect(authService).toBeDefined();
    });

    it('JWT service should be defined', () => {
      expect(jwtService).toBeDefined();
    });

    it('User repository should be defined', () => {
      expect(userRepository).toBeDefined();
    });
  });

  describe('valideteUser function', () => {
    it('Function should return promise', () => {
      const validationObject = authService.valideteUser(AuthInfoMock());
      expect(validationObject).resolves.toBeDefined();
    });
  });

  describe('Login function', () => {
    it('login function should return object', () => {
      const returnerdPayload = authService.login(AuthInfoMock());

      expect(returnerdPayload).toBeDefined();
    });
    it('retuner object should have access_token property', () => {
      const returnerdPayload = authService.login(AuthInfoMock());

      TestUtils.expectHasProperties(returnerdPayload, 'access_token');
    });

    it('retuner object should have refresh_token property', () => {
      const returnerdPayload = authService.login(AuthInfoMock());

      TestUtils.expectHasProperties(returnerdPayload, 'refresh_token');
    });
    it('access_token property to be string', () => {
      const returnerdPayload = authService.login(AuthInfoMock());

      expect(typeof returnerdPayload.access_token).toBe('string');
    });
    it('refresh_token property to be string', () => {
      const returnerdPayload = authService.login(AuthInfoMock());

      expect(typeof returnerdPayload.refresh_token).toBe('string');
    });
  });

  describe('refreshaccesstoken function', () => {
    it('refreshaccesstoken function should return object', () => {
      const returnerdPayload = authService.refreshaccesstoken(AuthInfoMock());

      expect(returnerdPayload).toBeDefined();
    });
    it('retuner object should have access_token property', () => {
      const returnerdPayload = authService.refreshaccesstoken(AuthInfoMock());

      TestUtils.expectHasProperties(returnerdPayload, 'access_token');
    });

    it('access_token should be string', () => {
      const returnerdPayload = authService.refreshaccesstoken(AuthInfoMock());

      expect(typeof returnerdPayload.access_token).toBe('string');
    });
  });
});
