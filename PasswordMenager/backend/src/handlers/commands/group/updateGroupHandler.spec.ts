import { Test, TestingModule } from '@nestjs/testing';
import { UpdateGroupCommand } from 'src/commands/group/UpdateGroupCommand';
import { GroupRepository } from 'src/repository/group.repository';
import { IGroup } from 'src/schemas/Interfaces/group.interface';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { EditGroupDto } from 'src/schemas/dto/editgroup.dto';
import { GroupModelMock } from '../../../../test/mock/GroupModelMock';
import { UpdateGroupCommandHandler } from './updateGroupHandler';

describe('UpdateGroupCommandHandler', () => {
  let handler: UpdateGroupCommandHandler;
  let repository: Repository<IGroup>;
  const exampleCreateGroupDTO: EditGroupDto = { name: 'test' };
  const exampleDeleteGroupCommand: UpdateGroupCommand = new UpdateGroupCommand(
    'test-group-id',
    exampleCreateGroupDTO,
  );
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateGroupCommandHandler,
        {
          provide: 'GROUP_MODEL',
          useValue: GroupModelMock,
        },
        { provide: Repository, useClass: GroupRepository },
      ],
    }).compile();

    handler = module.get<UpdateGroupCommandHandler>(UpdateGroupCommandHandler);
    repository = module.get<Repository<IGroup>>(Repository);
  });
  beforeEach(() => jest.clearAllMocks());
  it('should create a group command handler', () => {
    // Assert
    expect(handler).toBeDefined();
  });

  it('should handle create group command', async () => {
    // Arrange
    const spy = jest.spyOn(repository, 'update');

    // Act
    await handler.execute(exampleDeleteGroupCommand);

    // Assert
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should return promise', () => {
    const response = handler.execute(exampleDeleteGroupCommand);
    expect(response).toBeInstanceOf(Promise);
  });

  // Add more test cases as needed
});
