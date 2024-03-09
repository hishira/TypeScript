import { CreateNotificationDTO } from 'src/schemas/dto/createnotification.dto';
import { CreateNotificationCommand } from './CreateNotificationCommand';

describe('CreateNotificationCommand', () => {
  it('should create a notification command', () => {
    // Arrange
    const notificationDto: CreateNotificationDTO = {
      entryId: 'testEntryId',
      notificationChannel: 'SMS',
      notificationDate: new Date('2020-02-02'),
      userid: 'testUserId',
      toObject: () => ({}),
      // Add other properties as needed
    };

    // Act
    const command = new CreateNotificationCommand(notificationDto);

    // Assert
    expect(command).toBeDefined();
    expect(command.notificationDto).toEqual(notificationDto);
  });

  // Add more test cases as needed
});
