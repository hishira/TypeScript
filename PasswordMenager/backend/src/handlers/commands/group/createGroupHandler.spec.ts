import { Test, TestingModule } from '@nestjs/testing';
import { CreateGroupCommand } from 'src/commands/group/CreateGroupCommand';
import { GroupRepository } from 'src/repository/group.repository';
import { IGroup } from 'src/schemas/Interfaces/group.interface';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { CreateGroupDto } from 'src/schemas/dto/group.dto';
import { GroupDtoMapper } from 'src/schemas/mapper/groupDtoMapper';
import { GroupModelMock } from '../../../../test/mock/GroupModelMock';
import { CreateGrouCommandpHandler } from './createGroupHandler';

describe('CreateGroupCommandHandler', () => {
  let handler: CreateGrouCommandpHandler;
  let repository: Repository<IGroup>;
  const exampleCreateGroupDTO: CreateGroupDto = { name: 'test' };
  const exampleCreateGroupCommand: CreateGroupCommand = new CreateGroupCommand(
    'test-user-id',
    exampleCreateGroupDTO,
  );
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateGrouCommandpHandler,
        {
          provide: 'GROUP_MODEL',
          useValue: GroupModelMock,
        },
        { provide: Repository, useClass: GroupRepository },
      ],
    }).compile();

    handler = module.get<CreateGrouCommandpHandler>(CreateGrouCommandpHandler);
    repository = module.get<Repository<IGroup>>(Repository);
  });
  beforeEach(() => jest.clearAllMocks());
  it('should create a group command handler', () => {
    // Assert
    expect(handler).toBeDefined();
  });

  it('should handle create group command', async () => {
    // Arrange
    const spy = jest.spyOn(repository, 'create');
    const createGroupDto: CreateGroupDto = {
      name: 'TestGroup',
    };

    const createGroupCommand = new CreateGroupCommand(
      'testUserId',
      createGroupDto,
    );

    // Act
    await handler.execute(createGroupCommand);

    // Assert
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should return promise', () => {
    const response = handler.execute(exampleCreateGroupCommand);

    expect(response).toBeInstanceOf(Promise);
  });

  it('Should use CreatePureGroupDTO from GroupDtoMapper', async () => {
    const spy = jest.spyOn(GroupDtoMapper, 'CreatePureGroupDTO');
    await handler.execute(exampleCreateGroupCommand);
    expect(spy).toBeCalledTimes(1);
  });
});
