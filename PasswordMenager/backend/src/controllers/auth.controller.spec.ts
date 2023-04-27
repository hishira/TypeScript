import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from 'src/repository/user.repository';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { AuthService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';
import { UserModelMock } from '../../test/mock/UserModelMock';
import { TestUtils } from '../../test/utils/TestUtils';
import { AuthController } from './auth.controller';

describe('AuthController', () => {
  let authController: AuthController;
  let userService: UserService;
  let userRepository: UserRepository;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        UserService,
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
    authController = module.get<AuthController>(AuthController);
    userService = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(Repository);
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
  });

  describe('Create method', () => {
    it('Should use user service create method', async () => {
      const spy = jest.spyOn(userService, 'create');

      await authController.create({ login: 'example', password: 'example' });

      expect(spy).toBeCalledTimes(1);
    });

    it('Method should return promise', () => {
      const user = authController.create({
        login: 'example',
        password: 'example',
      });

      expect(user).toBeInstanceOf(Promise);
    });

    it('Method should return as async object user', async () => {
      const user = await authController.create({
        login: 'example',
        password: 'example',
      });

      TestUtils.expectHasProperties(user, 'login', 'password');
    });
  });
});
