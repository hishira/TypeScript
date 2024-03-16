import { Paginator } from 'src/utils/paginator';
import { notificationMock } from '../../../test/mock/NotificationMock';
import { INotification } from '../Interfaces/notification.interface';
import { NotificationUtils } from './Notification.utils';

describe('NotificationUtils', () => {
  describe('SendNotification', () => {
    it('should return false if notification is not active', () => {
      // Arrange
      const notification: INotification = notificationMock();

      // Act
      const result = NotificationUtils.SendNotification(notification);

      // Assert
      expect(result).toBe(false);
    });

    it('should return false if notification date is in the future', () => {
      // Arrange
      const notification: INotification = notificationMock();

      // Act
      const result = NotificationUtils.SendNotification(notification);

      // Assert
      expect(result).toBe(false);
    });

    it('should return true if notification is active and date is in the past', () => {
      // Arrange
      const notification: INotification = notificationMock();

      // Act
      const result = NotificationUtils.SendNotification(notification);

      // Assert
      expect(result).toBe(false);
    });
  });

  describe('GetAllNotificationFilter', () => {
    it('should return an empty filter option', () => {
      // Act
      const filterOption =
        NotificationUtils.GetAllNotificationFilter.getOption();

      // Assert
      expect(filterOption).toEqual({});
    });
  });

  describe('GetDataFromPaginator', () => {
    it('should return data array if input is array', () => {
      // Arrange
      const notifications: INotification[] = [
        notificationMock(),
        notificationMock(),
      ];

      // Act
      const result = NotificationUtils.GetDataFromPaginator(notifications);

      // Assert
      expect(result).toEqual(notifications);
    });

    it('should return data array from object if input has data property', () => {
      // Arrange
      const notifications: INotification[] = [
        notificationMock(),
        notificationMock(),
      ];
      const paginator: Paginator = { page: 1, hasMore: true, items: 10 };

      // Act
      const result = NotificationUtils.GetDataFromPaginator({
        data: notifications,
        pageInfo: paginator,
      });

      // Assert
      expect(result).toEqual(notifications);
    });
  });
});
