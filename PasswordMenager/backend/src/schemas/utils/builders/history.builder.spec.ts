import { HistoryBuilder } from './history.builder';

describe('HistoryBuilder', () => {
  describe('updateUserId', () => {
    it('should update the user ID', () => {
      // Arrange
      const builder = new HistoryBuilder();
      const userId = '123';

      // Act
      const result = builder.updateUserId(userId);

      // Assert
      expect(result).toBeInstanceOf(HistoryBuilder);
      expect(result['userId']).toEqual(userId);
    });

    it('should not update the user ID if undefined', () => {
      // Arrange
      const builder = new HistoryBuilder();
      const userId = '123';

      // Act
      const result = builder.updateUserId(undefined);

      // Assert
      expect(result).toBeInstanceOf(HistoryBuilder);
      expect(result['userId']).toBeNull();
    });
  });

  // Add more test cases for other methods as needed
});
