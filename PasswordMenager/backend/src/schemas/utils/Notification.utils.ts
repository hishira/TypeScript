import { Paginator } from 'src/utils/paginator';
import { FilterOption } from '../Interfaces/filteroption.interface';
import { INotification } from '../Interfaces/notification.interface';

export class NotificationUtils {
  static SendNotification(notification: INotification): boolean {
    return (
      notification.active &&
      notification.notificationDate < new Date(Date.now())
    );
  }

  static get GetAllNotificationFilter(): FilterOption<unknown> {
    return { getOption: () => ({}) };
  }

  static GetDataFromPaginator(
    data:
      | INotification[]
      | {
          data: INotification[];
          pageInfo: Paginator;
        },
  ): INotification[] {
    return Array.isArray(data) ? data : data.data;
  }
}
