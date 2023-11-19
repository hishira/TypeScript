import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FilterQuery } from 'mongoose';
import { GetFilteredUserQueries } from 'src/queries/user/getFilteredUser.queries';
import { FilterOption } from 'src/schemas/Interfaces/filteroption.interface';
import { IUser } from 'src/schemas/Interfaces/user.interface';
import { Paginator } from 'src/utils/paginator';
import { BaseQueryHandler } from '../BaseQueryHandler';

type UsersReturn =
  | IUser[]
  | {
      data: IUser[];
      pageInfo: Paginator;
    };
@QueryHandler(GetFilteredUserQueries)
export class GetFilteredUserQueryHandler
  extends BaseQueryHandler<IUser>
  implements IQueryHandler<GetFilteredUserQueries>
{
  execute(query: GetFilteredUserQueries): Promise<IUser | UsersReturn> {
    if ('login' in query) {
      const userByLogin: FilterOption<FilterQuery<IUser>> = {
        getOption() {
          return {
            login: query.login,
          };
        },
      };

      return this.repository.find(userByLogin);
    }
    return this.repository.findById(query.userid);
  }
}
