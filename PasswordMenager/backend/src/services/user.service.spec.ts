import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from 'src/repository/user.repository';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import {
  CreateUserDtoMock,
  EditUserDtoMock,
  UserModelMock,
  userMock,
} from '../../test/mock/UserModelMock';
import { TestDataUtils } from '../../test/utils/TestDataUtils';
import { TestUtils } from '../../test/utils/TestUtils';
import { UserService } from './user.service';
import { IUser } from 'src/schemas/Interfaces/user.interface';
import { Logger } from 'src/utils/Logger';
import { EventEmitter2 } from '@nestjs/event-emitter';

describe('UserService', () => {
  let userService: UserService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: QueryBus,
          useValue: {
            execute: (...params): Promise<IUser> => Promise.resolve(userMock()),
          },
        },
        {
          provide: CommandBus,
          useValue: {
            execute: (...params): Promise<IUser> => Promise.resolve(userMock()),
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
        Logger,
        {
          provide: EventEmitter2,
          useValue: {
            emitAsync: jest.fn(),
          },
        },
      ],
    }).compile();
    userService = module.get<UserService>(UserService);
  });

  it('User service should be defines', () => {
    expect(userService).toBeDefined();
  });

  it('Create method should retunr user object', async () => {
    const user = await userService.create(CreateUserDtoMock());

    TestUtils.expectHasProperties(user, 'login', 'password');
  });

  it('getAll method should retunr user object', async () => {
    // TODO: fix mock to return in some way array
    const user = await userService.getAll();

    TestUtils.expectHasProperties(user, 'login', 'password');
  });

  it('getOne method should retunr user object', async () => {
    const user = await userService.getOne();

    TestUtils.expectHasProperties(user, 'login', 'password');
  });

  it('update method should return user object', async () => {
    const updatedUser = await userService.update(
      TestDataUtils.getRandomObjectIdAsString(),
      EditUserDtoMock(),
    );
    TestUtils.expectHasProperties(updatedUser, 'login', 'password');
  });
});
