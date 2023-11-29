import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetNotificationQuery } from 'src/queries/notification/getNotification.queries';
import { INotification } from 'src/schemas/Interfaces/notification.interface';
import { NotificationUtils } from 'src/schemas/utils/Notification.utils';
import { ActiveNotificationFilter } from 'src/schemas/utils/activeNotificationFilter';
import { UserActiveNotificationFilter } from 'src/schemas/utils/userActiveNotificationFilter';
import { BaseQueryHandler } from '../BaseQueryHandler';

@QueryHandler(GetNotificationQuery)
export class GetNotificationQueryHandler
  extends BaseQueryHandler<INotification>
  implements IQueryHandler<GetNotificationQuery>
{
  execute(query: GetNotificationQuery): Promise<any> {
    const { input } = query;
    if ('userId' in input) {
      return this.repository.find(
        new UserActiveNotificationFilter(input.userId),
      );
    }
    if ('active' in input) {
      return this.repository.find(new ActiveNotificationFilter());
    }
    return this.repository.find(NotificationUtils.GetAllNotificationFilter);
  }
}
