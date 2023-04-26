import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserRepository } from 'src/repository/user.repository';
import { JwtService } from '@nestjs/jwt';
import { UserModelMock } from '../../test/mock/UserModelMock';
import { Repository } from 'src/schemas/Interfaces/repository.interface';

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;
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
  });

  describe('Services should be defined', () => {
    it('Auth service should be defined', () => {
      expect(authService).toBeDefined();
    });

    it('JWT service should be defined', () => {
      expect(jwtService).toBeDefined();
    });
  });
});
