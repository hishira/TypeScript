import { DeleteByGroupEvent } from './deleteEntryByGroupEvent';

describe('DeleteByGroupEvent', () => {
  it('should create a delete by group event with group ID', () => {
    // Arrange
    const groupId = 'groupId123';

    // Act
    const event = new DeleteByGroupEvent(groupId);

    // Assert
    expect(event.groupId).toEqual(groupId);
  });
});
