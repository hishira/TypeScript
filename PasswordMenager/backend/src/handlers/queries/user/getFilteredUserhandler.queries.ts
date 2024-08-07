import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FilterQuery } from 'mongoose';
import { GetFilteredUserQueries } from 'src/queries/user/getFilteredUser.queries';
import { FilterOption } from 'src/schemas/Interfaces/filteroption.interface';
import { IUser } from 'src/schemas/Interfaces/user.interface';
import { Paginator } from 'src/utils/paginator';
import { BaseQueryHandler } from '../BaseQueryHandler';
import { BaseError } from 'src/errors/bace-error';
import { FilterUserInput } from 'src/queries/user/FilterUserInput';

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
  execute(
    query: GetFilteredUserQueries,
  ): Promise<IUser | UsersReturn | PaginatorData<IUser> | BaseError> {
    const { input } = query;
    if ('login' in input) {
      return this.repository.find(this.prepareLoginInput(input));
    }
    return this.repository.findById(input.userid);
  }

  private prepareLoginInput(
    input: FilterUserInput,
  ): FilterOption<FilterQuery<IUser>> {
    return {
      getOption(): FilterQuery<IUser> {
        return {
          login: input.login,
        };
      },
    };
  }
}
