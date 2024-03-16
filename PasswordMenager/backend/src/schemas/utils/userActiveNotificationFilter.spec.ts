import { NotificationChannel } from '../Interfaces/notification.interface';
import { UserActiveNotificationFilter } from './userActiveNotificationFilter';

describe('UserActiveNotificationFilter', () => {
  it('should return the correct filter option object', () => {
    // Arrange
    const userId = 'user123';
    const active = true;
    const notificationChannel = NotificationChannel.Email;
    const expectedOption = {
      active,
      notificationChannel,
      userid: userId,
    };

    // Act
    const filter = new UserActiveNotificationFilter(
      userId,
      active,
      notificationChannel,
    );
    const option = filter.getOption();

    // Assert
    expect(option).toEqual(expectedOption);
  });
});
