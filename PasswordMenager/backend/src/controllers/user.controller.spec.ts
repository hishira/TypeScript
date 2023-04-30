import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from 'src/repository/user.repository';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { UserService } from 'src/services/user.service';
import { UserModelMock } from '../../test/mock/UserModelMock';
import { UsersController } from './user.contaoller';

describe('UserController', () => {
  let userController: UsersController;
  let userService: UserService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
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
    userController = module.get<UsersController>(UsersController);
    userService = module.get<UserService>(UserService);
  });

  describe('Should be defined', () => {
    it('User controller should be defined', () => {
      expect(userController).toBeDefined();
    });
    it('User service should be defined', () => {
      expect(userService).toBeDefined();
    });
  });
});
