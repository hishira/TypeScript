import { Test, TestingModule } from '@nestjs/testing';
import { DeleteGroupCommand } from 'src/commands/group/DeleteGroupCommand';
import { GroupRepository } from 'src/repository/group.repository';
import { IGroup } from 'src/schemas/Interfaces/group.interface';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { CreateGroupDto } from 'src/schemas/dto/group.dto';
import { GroupOptionBuilder } from 'src/schemas/utils/builders/groupOption.builder';
import { GroupModelMock } from '../../../../test/mock/GroupModelMock';
import { DeleteGroupCommandHandler } from './deleteGroupHandler';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Logger } from 'src/utils/Logger';

describe('DeleteGroupCommandHandler', () => {
  let handler: DeleteGroupCommandHandler;
  let repository: Repository<IGroup>;
  const exampleCreateGroupDTO: CreateGroupDto = { name: 'test' };
  const exampleDeleteGroupCommand: DeleteGroupCommand = new DeleteGroupCommand({
    id: 'testId',
    userId: 'test-user-id',
  });
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteGroupCommandHandler,
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

    handler = module.get<DeleteGroupCommandHandler>(DeleteGroupCommandHandler);
    repository = module.get<Repository<IGroup>>(Repository);
  });
  beforeEach(() => jest.clearAllMocks());
  it('should create a group command handler', () => {
    // Assert
    expect(handler).toBeDefined();
  });

  it('should handle create group command', async () => {
    // Arrange
    const spy = jest.spyOn(repository, 'delete');

    // Act
    await handler.execute(exampleDeleteGroupCommand);

    // Assert
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should return promise', () => {
    const response = handler.execute(exampleDeleteGroupCommand);
    expect(response).toBeInstanceOf(Promise);
  });

  it('Should use GroupOptionBuilder', async () => {
    const spy = jest.spyOn(GroupOptionBuilder.prototype, 'getOption');
    await handler.execute(exampleDeleteGroupCommand);
    expect(spy).toBeCalledTimes(1);
  });
});
