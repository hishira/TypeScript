import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from 'src/repository/user.repository';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { UserModelMock } from '../../test/mock/UserModelMock';
import { TestDataUtils } from '../../test/utils/TestDataUtils';
import { TestUtils } from '../../test/utils/TestUtils';
import { UserService } from './user.service';

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

  it('Create method should retunr user object', async () => {
    const user = await userService.create({
      login: 'login_user_example',
      password: 'password_example',
    });

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
      {
        login: 'updated_login',
        password: 'updated_password',
      },
    );
    TestUtils.expectHasProperties(updatedUser, 'login', 'password');
  });
});
