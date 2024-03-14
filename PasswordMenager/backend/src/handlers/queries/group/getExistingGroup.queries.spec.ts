import { Test } from '@nestjs/testing';
import { GetExistingGroupQuery } from 'src/queries/group/getExistingGroup.queries';
import { GroupRepository } from 'src/repository/group.repository';
import { IGroup } from 'src/schemas/Interfaces/group.interface';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { GroupUtils } from 'src/schemas/utils/group.utils';
import {
  GroupModelMock,
  groupMock,
} from '../../../../test/mock/GroupModelMock';
import { GetExistingGroupQueryHandler } from './getExistingGroup.queries';

describe('GetExistingGroupQueryHandler', () => {
  let handler: GetExistingGroupQueryHandler;
  let repositoryMock: Repository<IGroup>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        GetExistingGroupQueryHandler,
        {
          provide: 'GROUP_MODEL',
          useValue: GroupModelMock,
        },
        { provide: Repository, useClass: GroupRepository },
      ],
    }).compile();

    handler = moduleRef.get<GetExistingGroupQueryHandler>(
      GetExistingGroupQueryHandler,
    );
    repositoryMock = moduleRef.get<Repository<IGroup>>(Repository);
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it('should return existing group when id is provided', async () => {
    // Arrange
    const groupId = 'groupId123';

    const query = new GetExistingGroupQuery({ id: groupId });
    const spy = jest.spyOn(GroupUtils, 'EmptyGroupGuard');
    const findByIdsSpy = jest.spyOn(repositoryMock, 'findById');
    // Act
    const result = await handler.execute(query);

    // Assert
    expect(result).toEqual(groupMock());
    expect(findByIdsSpy).toHaveBeenCalledWith(groupId);
    expect(spy).toHaveBeenCalledWith(expect.objectContaining(groupMock()));
  });

  it('should use findById', async () => {
    const groupId = 'groupId123';

    const query = new GetExistingGroupQuery({ id: groupId });
    const spy = jest.spyOn(repositoryMock, 'findById');
    // Act
    await handler.execute(query);

    // Assert
    expect(spy).toHaveBeenCalledTimes(1);
  });
  it('should return promise', async () => {
    const groupId = 'groupId123';

    const query = new GetExistingGroupQuery({ id: groupId });
    // Act
    const response = handler.execute(query);

    // Assert
    expect(response).toBeInstanceOf(Promise);
  });
});
