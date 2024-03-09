import { NotificationChannel } from 'src/schemas/Interfaces/notification.interface';
import { NotificationCommandInput } from './NotificationCommandInput';

describe('NotificationCommandInput', () => {
  it('should create a notification command input with all properties', () => {
    // Arrange
    const input: NotificationCommandInput = {
      _id: 'testId',
      notificationData: 'testNotificationData',
      notificationChannel: NotificationChannel.Account,
      active: true,
      // Add other properties as needed
    };

    // Act
    const notificationInput = input;

    // Assert
    expect(notificationInput).toBeDefined();
    expect(notificationInput._id).toEqual(input._id);
    expect(notificationInput.notificationData).toEqual(input.notificationData);
    expect(notificationInput.notificationChannel).toEqual(
      input.notificationChannel,
    );
    expect(notificationInput.active).toEqual(input.active);
  });

  it('should create a notification command input with default values', () => {
    // Arrange

    // Act
    const notificationInput = new NotificationCommandInput();

    // Assert
    expect(notificationInput).toBeDefined();
    expect(notificationInput._id).toBeUndefined();
    expect(notificationInput.notificationData).toBeUndefined();
    expect(notificationInput.notificationChannel).toBeUndefined();
    expect(notificationInput.active).toBeUndefined();
  });

  // Add more test cases as needed
});
