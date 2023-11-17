import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetFilteredUserQueries } from 'src/queries/user/getFilteredUser.queries';
import { IUser } from 'src/schemas/Interfaces/user.interface';
import { BaseQueryHandler } from '../BaseQueryHandler';

@QueryHandler(GetFilteredUserQueries)
export class GetFilteredUserQueryHandler
  extends BaseQueryHandler<IUser>
  implements IQueryHandler<GetFilteredUserQueries>
{
  execute(query: GetFilteredUserQueries): Promise<IUser> {
    return this.repository.findById(query.userid);
  }
}
