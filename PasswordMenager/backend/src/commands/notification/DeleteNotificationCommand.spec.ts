import { NotificationChannel } from 'src/schemas/Interfaces/notification.interface';
import { DeleteNotificationCommand } from './DeleteNotificationCommand';
import { NotificationCommandInput } from './NotificationCommandInput';

describe('DeleteNotificationCommand', () => {
  it('should create a delete notification command', () => {
    // Arrange
    const deleteNotificationInput: NotificationCommandInput = {
      _id: 'testId',
      notificationData: 'testNotificationData',
      notificationChannel: NotificationChannel.Account,
      active: true,
      // Add other properties as needed
    };

    // Act
    const command = new DeleteNotificationCommand(deleteNotificationInput);

    // Assert
    expect(command).toBeDefined();
    expect(command.deleteNotificationInput).toEqual(deleteNotificationInput);
  });

  it('should create a delete notification command with default values', () => {
    // Arrange
    const deleteNotificationInput: NotificationCommandInput = {};

    // Act
    const command = new DeleteNotificationCommand(deleteNotificationInput);

    // Assert
    expect(command).toBeDefined();
    expect(command.deleteNotificationInput).toEqual(deleteNotificationInput);
  });

  // Add more test cases as needed
});
