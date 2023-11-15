import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetFilteredUserQueries } from 'src/queries/user/getFilteredUser.queries';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { IUser } from 'src/schemas/Interfaces/user.interface';

@QueryHandler(GetFilteredUserQueries)
export class GetFilteredUserQueryHandler
  implements IQueryHandler<GetFilteredUserQueries>
{
  constructor(
    @Inject(Repository) private readonly userRepository: Repository<IUser>,
  ) {}
  execute(query: GetFilteredUserQueries): Promise<IUser> {
    return this.userRepository.findById(query.userid);
  }
}
