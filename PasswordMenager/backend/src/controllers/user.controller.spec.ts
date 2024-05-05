import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from 'src/repository/user.repository';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { UserService } from 'src/services/user.service';
import {
  EditUserDtoMock,
  UserModelMock,
  UserRequestMock,
  userMock,
} from '../../test/mock/UserModelMock';
import { TestUtils } from '../../test/utils/TestUtils';
import { UsersController } from './user.contaoller';
import { Logger } from 'src/utils/Logger';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { IUser } from 'src/schemas/Interfaces/user.interface';

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
        {
          provide: QueryBus,
          useValue: {
            execute: (...params): Promise<IUser> => Promise.resolve(userMock()),
          },
        },
        Logger,
        {
          provide: EventEmitter2,
          useValue: {
            emit: jest.fn(),
            emitAsync: jest.fn(),
          },
        },
        {
          provide: CommandBus,
          useValue: {
            execute: (...params): Promise<IUser> => Promise.resolve(userMock()),
          },
        },
      ],
    }).compile();
    userController = module.get<UsersController>(UsersController);
    userService = module.get<UserService>(UserService);
  });

  beforeEach(() => jest.clearAllMocks());
  describe('Should be defined', () => {
    it('User controller should be defined', () => {
      expect(userController).toBeDefined();
    });
    it('User service should be defined', () => {
      expect(userService).toBeDefined();
    });
  });

  describe('Find all', () => {
    it('Should use getAll from userService', () => {
      const spy = jest.spyOn(userService, 'getAll');
      userController.findAll();

      expect(spy).toBeCalledTimes(1);
    });

    it('Should retunr promise', async () => {
      const response = userController.findAll();

      expect(response).resolves.toBeDefined();
    });

    it('Should return users', async () => {
      const response = await userController.findAll();
      TestUtils.expectHasProperties(response, 'login', 'password');
    });
  });

  describe('Get one', () => {
    it('Should use getAll from userService', () => {
      const spy = jest.spyOn(userService, 'getOne');
      userController.findOne();

      expect(spy).toBeCalledTimes(1);
    });

    it('Should retunr promise', async () => {
      const response = userController.findOne();

      expect(response).resolves.toBeDefined();
    });

    it('Should return users', async () => {
      const response = await userController.findOne();
      TestUtils.expectHasProperties(response, 'login', 'password');
    });
  });

  describe('Get one', () => {
    it('Should use getAll from userService', () => {
      const spy = jest.spyOn(userService, 'getOne');
      userController.findOne();

      expect(spy).toBeCalledTimes(1);
    });

    it('Should retunr promise', async () => {
      const response = userController.findOne();

      expect(response).resolves.toBeDefined();
    });

    it('Should return users', async () => {
      const response = await userController.findOne();
      TestUtils.expectHasProperties(response, 'login', 'password');
    });
  });

  describe('UpdateUser', () => {
    it('Should use getAll from userService', () => {
      const spy = jest.spyOn(userService, 'update');
      userController.updateUser(EditUserDtoMock(), UserRequestMock());

      expect(spy).toBeCalledTimes(1);
    });

    it('Should retunr promise', async () => {
      const response = userController.updateUser(
        EditUserDtoMock(),
        UserRequestMock(),
      );

      expect(response).resolves.toBeDefined();
    });

    it('Should return users', async () => {
      const response = await userController.updateUser(
        EditUserDtoMock(),
        UserRequestMock(),
      );
      TestUtils.expectHasProperties(response, 'login', 'password');
    });
  });
});
