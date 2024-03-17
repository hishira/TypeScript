import { GroupOptionBuilder } from './groupOption.builder';

describe('GroupOptionBuilder', () => {
  describe('updateUserId', () => {
    it('should update the user ID in the option', () => {
      // Arrange
      const builder = new GroupOptionBuilder();
      const userId = '123';

      // Act
      const result = builder.updateUserId(userId);

      // Assert
      expect(result).toBeInstanceOf(GroupOptionBuilder);
      expect(result['option']['userid']).toEqual(userId);
    });

    it('should not update the user ID if undefined', () => {
      // Arrange
      const builder = new GroupOptionBuilder();
      const userId = '123';

      // Act
      const result = builder.updateUserId(undefined);

      // Assert
      expect(result).toBeInstanceOf(GroupOptionBuilder);
      expect(result['option']['userid']).toBeUndefined();
    });
  });

  describe('updateId', () => {
    it('should update the group ID in the option', () => {
      // Arrange
      const builder = new GroupOptionBuilder();
      const groupId = 'abc';

      // Act
      const result = builder.updateId(groupId);

      // Assert
      expect(result).toBeInstanceOf(GroupOptionBuilder);
      expect(result['option']['_id']).toEqual(groupId);
    });

    it('should not update the group ID if undefined', () => {
      // Arrange
      const builder = new GroupOptionBuilder();
      const groupId = 'abc';

      // Act
      const result = builder.updateId(undefined);

      // Assert
      expect(result).toBeInstanceOf(GroupOptionBuilder);
      expect(result['option']['_id']).toBeUndefined();
    });
  });

  // Add more test cases for other methods as needed
});
