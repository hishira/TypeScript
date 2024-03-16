import { DeleteEntryCommand } from './DeleteEntryCommand';
import { DeleteEntryInput } from './DeleteEntryInput';

describe('DeleteEntryCommand', () => {
  it('should create a delete entry command with deleteEntryInput', () => {
    // Arrange
    const deleteEntryInput: DeleteEntryInput = {
      id: 'entry123',
      groupId: 'group123',
    }; // Mock delete entry input

    // Act
    const command = new DeleteEntryCommand(deleteEntryInput);

    // Assert
    expect(command.deleteEntryInput).toEqual(deleteEntryInput);
  });
});
