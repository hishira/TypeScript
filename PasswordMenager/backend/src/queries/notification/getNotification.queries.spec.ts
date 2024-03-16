import { GetNotificationQuery } from './getNotification.queries';
import { NotificationInput } from './NotificationInput.interface';

describe('GetNotificationQuery', () => {
  it('should create a GetNotificationQuery instance with input', () => {
    // Arrange
    const notificationInput: NotificationInput = {
      // Mock NotificationInput properties
      userId: 'user123',
      active: true,
    };

    // Act
    const query = new GetNotificationQuery(notificationInput);

    // Assert
    expect(query.input).toEqual(notificationInput);
  });
});
