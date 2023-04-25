import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { UserRepository } from 'src/repository/user.repository';
import { UserModelMock } from '../../test/mock/UserModelMock';

describe('UserService', () => {
  let userService: UserService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
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
    userService = module.get<UserService>(UserService);
  });

  it('User service should be defines', () => {
    expect(userService).toBeDefined();
  });
});
