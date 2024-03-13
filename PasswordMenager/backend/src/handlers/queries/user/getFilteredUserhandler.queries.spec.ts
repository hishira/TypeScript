import { Test } from '@nestjs/testing';
import { GetFilteredUserQueries } from 'src/queries/user/getFilteredUser.queries';
import { UserRepository } from 'src/repository/user.repository';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { UserModelMock } from '../../../../test/mock/UserModelMock';
import { GetFilteredUserQueryHandler } from './getFilteredUserhandler.queries';

describe('GetAllUserQueryHandler', () => {
  let handler: GetFilteredUserQueryHandler;
  let repositoryMock: UserRepository; // Mock your repository

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        GetFilteredUserQueryHandler,
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

    handler = moduleRef.get<GetFilteredUserQueryHandler>(
      GetFilteredUserQueryHandler,
    );
    repositoryMock = moduleRef.get<UserRepository>(Repository);
  });
  beforeEach(() => jest.clearAllMocks());
  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it('should return all users', async () => {
    // Arrange

    const query = new GetFilteredUserQueries({ userid: '123' });
    // Act
    const result = await handler.execute(query);

    // Assert
    expect(result).toBeInstanceOf(Object);
  });

  it('should return promise', () => {
    const query = new GetFilteredUserQueries({ userid: '123' });
    // Act
    const result = handler.execute(query);

    // Assert
    expect(result).toBeInstanceOf(Promise);
  });
  it('should filter by userid should use findById from repo', async () => {
    const query = new GetFilteredUserQueries({ userid: '123' });
    const spy = jest.spyOn(repositoryMock, 'findById');
    // Act
    const result = await handler.execute(query);

    // Assert
    expect(result).toBeInstanceOf(Object);
    expect(spy).toHaveBeenCalledTimes(1);
  });
  it('should filter by login should use findById from repo', async () => {
    const query = new GetFilteredUserQueries({ login: '123' });
    const spy = jest.spyOn(repositoryMock, 'find');
    // Act
    const result = await handler.execute(query);

    // Assert
    expect(result).toBeInstanceOf(Array);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
