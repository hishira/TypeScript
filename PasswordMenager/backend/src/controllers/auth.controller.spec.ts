import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { UserService } from 'src/services/user.service';
import { AuthService } from 'src/services/auth.service';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { UserRepository } from 'src/repository/user.repository';
import { UserModelMock } from '../../test/mock/UserModelMock';
import { JwtService } from '@nestjs/jwt';

describe('AuthController', () => {
  let authController: AuthController;

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
  });

  describe('Controller should be defined', () => {
    it('Auth controller should be defined', () => {
      expect(authController).toBeDefined();
    });
  });
});
