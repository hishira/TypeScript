import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from 'src/repository/user.repository';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { UserModelMock } from '../../test/mock/UserModelMock';
import { TestUtils } from '../../test/utils/TestUtils';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;
  let userRepository: UserRepository;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
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
      const validationObject = authService.valideteUser({
        login: 'test',
        password: 'tesst',
      });
      expect(validationObject).resolves.toBeDefined();
    });

    it('find function should be user from user repo', async () => {
      const spy = jest.spyOn(userRepository, 'find');
      await authService.valideteUser({
        login: 'test',
        password: 'tesst',
      });
      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('Login function', () => {
    it('login function should return object', () => {
      const returnerdPayload = authService.login({
        login: 'exampleLogin',
        password: 'examplespassword',
      });

      expect(returnerdPayload).toBeDefined();
    });
    it('retuner object should have access_token property', () => {
      const returnerdPayload = authService.login({
        login: 'exampleLogin',
        password: 'examplespassword',
      });

      TestUtils.expectHasProperties(returnerdPayload, 'access_token');
    });

    it('retuner object should have refresh_token property', () => {
      const returnerdPayload = authService.login({
        login: 'exampleLogin',
        password: 'examplespassword',
      });

      TestUtils.expectHasProperties(returnerdPayload, 'refresh_token');
    });
    it('access_token property to be string', () => {
      const returnerdPayload = authService.login({
        login: 'exampleLogin',
        password: 'examplespassword',
      });

      expect(typeof returnerdPayload.access_token).toBe('string');
    });
    it('refresh_token property to be string', () => {
      const returnerdPayload = authService.login({
        login: 'exampleLogin',
        password: 'examplespassword',
      });

      expect(typeof returnerdPayload.refresh_token).toBe('string');
    });
  });

  describe('refreshaccesstoken function', () => {
    it('refreshaccesstoken function should return object', () => {
      const returnerdPayload = authService.refreshaccesstoken({
        login: 'exampleLogin',
        password: 'examplespassword',
      });

      expect(returnerdPayload).toBeDefined();
    });
    it('retuner object should have access_token property', () => {
      const returnerdPayload = authService.refreshaccesstoken({
        login: 'exampleLogin',
        password: 'examplespassword',
      });

      TestUtils.expectHasProperties(returnerdPayload, 'access_token');
    });

    it('access_token should be string', () => {
      const returnerdPayload = authService.refreshaccesstoken({
        login: 'exampleLogin',
        password: 'examplespassword',
      });

      expect(typeof returnerdPayload.access_token).toBe('string');
    });
  });
});
