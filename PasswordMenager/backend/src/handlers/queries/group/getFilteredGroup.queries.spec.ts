import { Test } from '@nestjs/testing';
import { GetFilteredGroup } from 'src/queries/group/getFilteredGroup.queries';
import { GroupRepository } from 'src/repository/group.repository';
import { IGroup } from 'src/schemas/Interfaces/group.interface';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { GroupOptionBuilder } from 'src/schemas/utils/builders/groupOption.builder';
import { GroupModelMock } from '../../../../test/mock/GroupModelMock';
import { GetFilteredGroupQueryHandler } from './getFilteredGroup.queries';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Logger } from 'src/utils/Logger';

describe('GetExistingGroupQueryHandler', () => {
  let handler: GetFilteredGroupQueryHandler;
  let repositoryMock: Repository<IGroup>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        GetFilteredGroupQueryHandler,
        {
          provide: 'GROUP_MODEL',
          useValue: GroupModelMock,
        },
        {
          provide: EventEmitter2,
          useValue: {
            emit: jest.fn(),
            emitAsync: jest.fn(),
          },
        },
        Logger,
        { provide: Repository, useClass: GroupRepository },
      ],
    }).compile();

    handler = moduleRef.get<GetFilteredGroupQueryHandler>(
      GetFilteredGroupQueryHandler,
    );
    repositoryMock = moduleRef.get<Repository<IGroup>>(Repository);
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it('should return existing group when id is provided', async () => {
    // Arrange
    const groupId = 'groupId123';

    const query = new GetFilteredGroup({ id: groupId });
    const groupObject = new GroupOptionBuilder()
      .updateUserId(query.groupQueryInput.userId)
      .updateId(query.groupQueryInput.id)
      .getOption();
    const findByIdsSpy = jest.spyOn(repositoryMock, 'find');
    // Act
    const result = await handler.execute(query);

    // Assert
    expect(result).toBeInstanceOf(Array);
    expect(findByIdsSpy).toHaveBeenCalledWith({
      getOption: expect.any(Function),
    });
  });

  it('should use find', async () => {
    const groupId = 'groupId123';

    const query = new GetFilteredGroup({ id: groupId });
    const spy = jest.spyOn(repositoryMock, 'find');
    // Act
    await handler.execute(query);

    // Assert
    expect(spy).toHaveBeenCalledTimes(1);
  });
  it('should return promise', async () => {
    const groupId = 'groupId123';

    const query = new GetFilteredGroup({ id: groupId });
    // Act
    const response = handler.execute(query);

    // Assert
    expect(response).toBeInstanceOf(Promise);
  });
});
