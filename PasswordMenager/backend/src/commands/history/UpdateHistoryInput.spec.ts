import { IGroup } from 'src/schemas/Interfaces/group.interface';
import { entryMock } from '../../../test/mock/EntryMock';
import { groupMock } from '../../../test/mock/GroupModelMock';
import { UpdateHistoryInput } from './UpdateHistoryInput';
describe('UpdateHistoryInput', () => {
  it('should create an update history input with all properties', () => {
    // Arrange
    const updateHistoryInput: UpdateHistoryInput = {
      userId: 'testUserId',
      entries: [entryMock()],
      groups: [groupMock() as IGroup],
    };

    // Assert
    expect(updateHistoryInput).toBeDefined();
    expect(updateHistoryInput.userId).toEqual('testUserId');
    expect(updateHistoryInput.entries).toHaveLength(1); // Adjust the length based on the actual entries
    expect(updateHistoryInput.groups).toHaveLength(1); // Adjust the length based on the actual groups
  });

  it('should create an update history input with default values', () => {
    // Arrange
    const updateHistoryInput: UpdateHistoryInput = { userId: 'testUserId' };

    // Assert
    expect(updateHistoryInput).toBeDefined();
    expect(updateHistoryInput.userId).toEqual('testUserId');
    expect(updateHistoryInput.entries).toBeUndefined();
    expect(updateHistoryInput.groups).toBeUndefined();
  });

  // Add more test cases as needed
});
