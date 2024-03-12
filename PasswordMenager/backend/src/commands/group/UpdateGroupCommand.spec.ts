import { EditGroupDto } from 'src/schemas/dto/editgroup.dto';
import { UpdateGroupCommand } from './UpdateGroupCommand';

describe('UpdateGroupCommand', () => {
  it('should create an instance of UpdateGroupCommand with provided groupId and editGroupDTO', () => {
    // Arrange
    const groupId = 'groupId123';
    const editGroupDTO: EditGroupDto = {
      name: 'UpdatedGroupName',
    };

    // Act
    const command = new UpdateGroupCommand(groupId, editGroupDTO);

    // Assert
    expect(command).toBeDefined();
    expect(command.groupId).toBe(groupId);
    expect(command.editGroupDTO).toBe(editGroupDTO);
  });
});
