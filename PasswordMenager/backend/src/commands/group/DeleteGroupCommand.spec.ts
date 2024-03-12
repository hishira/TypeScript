import { DeleteGroupCommand } from './DeleteGroupCommand';

describe('DeleteGroupCommand', () => {
  it('should create a DeleteGroupCommand instance with provided deleteGroupInput', () => {
    // Arrange
    const deleteGroupInput = {
      id: 'groupId123',
      userId: 'userId456',
    };

    // Act
    const deleteGroupCommand = new DeleteGroupCommand(deleteGroupInput);

    // Assert
    expect(deleteGroupCommand).toBeDefined();
    expect(deleteGroupCommand.deleteGroupInput).toEqual(deleteGroupInput);
  });

  it('should create a DeleteGroupCommand instance with undefined deleteGroupInput', () => {
    // Act
    const deleteGroupCommand = new DeleteGroupCommand({});

    // Assert
    expect(deleteGroupCommand).toBeDefined();
    expect(deleteGroupCommand.deleteGroupInput).toEqual({});
  });
});
