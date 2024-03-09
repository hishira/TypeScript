import { NotificationChannel } from 'src/schemas/Interfaces/notification.interface';
import { EditNotificationCommand } from './EditNotificationCommand';
import { NotificationCommandInput } from './NotificationCommandInput';

describe('EditNotificationCommand', () => {
  it('should create an edit notification command', () => {
    // Arrange
    const notificationInput: NotificationCommandInput = {
      _id: 'testId',
      notificationData: 'testNotificationData',
      notificationChannel: NotificationChannel.Account,
      active: true,
      // Add other properties as needed
    };

    // Act
    const command = new EditNotificationCommand(notificationInput);

    // Assert
    expect(command).toBeDefined();
    expect(command.notificationInput).toEqual(notificationInput);
  });

  it('should create an edit notification command with default values', () => {
    // Arrange
    const notificationInput: NotificationCommandInput = {};

    // Act
    const command = new EditNotificationCommand(notificationInput);

    // Assert
    expect(command).toBeDefined();
    expect(command.notificationInput).toEqual(notificationInput);
  });

  // Add more test cases as needed
});
