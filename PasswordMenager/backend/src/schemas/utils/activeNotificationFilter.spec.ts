import { ActiveNotificationFilter } from './activeNotificationFilter';
import { NotificationChannel } from '../Interfaces/notification.interface';

describe('ActiveNotificationFilter', () => {
  it('should construct the correct filter options with default values', () => {
    // Arrange
    const expectedOptions = {
      active: true,
      notificationChannel: NotificationChannel.Email,
    };

    // Act
    const activeNotificationFilter = new ActiveNotificationFilter();

    // Assert
    expect(activeNotificationFilter.getOption()).toEqual(expectedOptions);
  });

  it('should allow custom filter options', () => {
    // Arrange
    const customOptions = {
      active: false,
      notificationChannel: NotificationChannel.Sms,
    };

    // Act
    const activeNotificationFilter = new ActiveNotificationFilter(
      customOptions.active,
      customOptions.notificationChannel,
    );

    // Assert
    expect(activeNotificationFilter.getOption()).toEqual(customOptions);
  });
});
