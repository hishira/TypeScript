import { Test } from '@nestjs/testing';
import { GetAllUserQuery } from 'src/queries/user/getAllUser.queries';
import { UserRepository } from 'src/repository/user.repository';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { UserUtils } from 'src/schemas/utils/user.utils';
import { UserModelMock } from '../../../../test/mock/UserModelMock';
import { GetAllUserQueryHandler } from './getAllUserHandler.queries';

describe('GetAllUserQueryHandler', () => {
  let handler: GetAllUserQueryHandler;
  let repositoryMock: UserRepository; // Mock your repository

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        GetAllUserQueryHandler,
        // Mock your repository
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

    handler = moduleRef.get<GetAllUserQueryHandler>(GetAllUserQueryHandler);
    repositoryMock = moduleRef.get<UserRepository>(Repository);
  });
  beforeEach(() => jest.clearAllMocks());
  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it('should return all users', async () => {
    // Arrange

    const query = new GetAllUserQuery();
    const spy = jest.spyOn(repositoryMock, 'find');
    // Act
    const result = await handler.execute(query);

    // Assert
    expect(result).toBeInstanceOf(Array);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should return promise', () => {
    const query = new GetAllUserQuery();
    // Act
    const result = handler.execute(query);

    // Assert
    expect(result).toBeInstanceOf(Promise);
  });
  it('should use UserUtils.allUserFilterOption', async () => {
    const query = new GetAllUserQuery();
    const spy = jest.spyOn(repositoryMock, 'find');
    // Act
    const result = await handler.execute(query);

    // Assert
    expect(result).toBeInstanceOf(Array);
    expect(spy).toHaveBeenCalledWith({
      ...UserUtils.allUserFilterOption,
      getOption: expect.any(Function),
    });
  });
});
