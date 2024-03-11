import { CreateGroupDto } from 'src/schemas/dto/group.dto';
import { CreateGroupCommand } from './CreateGroupCommand';

describe('CreateGroupCommand', () => {
  it('should create a create group command', () => {
    // Arrange
    const createGroupDto: CreateGroupDto = {
      name: 'TestGroup',
    };

    // Act
    const createGroupCommand = new CreateGroupCommand(
      'testUserId',
      createGroupDto,
    );

    // Assert
    expect(createGroupCommand).toBeDefined();
    expect(createGroupCommand.userid).toEqual('testUserId');
    expect(createGroupCommand.groupCreateDTO).toEqual(createGroupDto);
  });

  // Add more test cases as needed
});
