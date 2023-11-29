import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllUserQuery } from 'src/queries/user/getAllUser.queries';
import { IUser } from 'src/schemas/Interfaces/user.interface';
import { UserUtils } from 'src/schemas/utils/user.utils';
import { Paginator } from 'src/utils/paginator';
import { BaseQueryHandler } from '../BaseQueryHandler';

@QueryHandler(GetAllUserQuery)
export class GetAllUserQueryHandler
  extends BaseQueryHandler<IUser>
  implements IQueryHandler<GetAllUserQuery>
{
  execute(
    query: GetAllUserQuery,
  ): Promise<IUser[] | { data: IUser[]; pageInfo: Paginator }> {
    return this.repository.find(UserUtils.allUserFilterOption);
  }
}
