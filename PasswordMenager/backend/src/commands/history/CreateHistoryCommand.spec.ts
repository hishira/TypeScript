import { CreateHistoryCommand } from './CreateHistoryCommand';

describe('CreateHistoryCommand', () => {
  it('should create a history command with userid', () => {
    // Arrange
    const userId = 'testUserId';

    // Act
    const command = new CreateHistoryCommand(userId);

    // Assert
    expect(command).toBeDefined();
    expect(command.userid).toEqual(userId);
  });

  // Add more test cases as needed
});
