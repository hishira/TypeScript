import { IGroup } from 'src/schemas/Interfaces/group.interface';
import { entryMock } from '../../../test/mock/EntryMock';
import { groupMock } from '../../../test/mock/GroupModelMock';
import { UpdateHistoryCommand } from './UpdateHistoryCommand';
import { UpdateHistoryInput } from './UpdateHistoryInput';

describe('UpdateHistoryCommand', () => {
  it('should create an update history command with all properties', () => {
    // Arrange
    const updateHistoryInput: UpdateHistoryInput = {
      userId: 'testUserId',
      entries: [entryMock(), entryMock()],
      groups: [groupMock() as IGroup, groupMock() as IGroup],
      // Add other properties as needed
    };

    // Act
    const command = new UpdateHistoryCommand(updateHistoryInput);

    // Assert
    expect(command).toBeDefined();
    expect(command.input).toEqual(updateHistoryInput);
  });

  it('should create an update history command with default values', () => {
    // Arrange
    const updateHistoryInput: UpdateHistoryInput = {
      userId: 'testUserId',
    };

    // Act
    const command = new UpdateHistoryCommand(updateHistoryInput);

    // Assert
    expect(command).toBeDefined();
    expect(command.input).toEqual(updateHistoryInput);
  });

  // Add more test cases as needed
});
