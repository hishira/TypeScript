import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllUserQuery } from 'src/queries/user/getAllUser.queries';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { IUser, UserUtils } from 'src/schemas/Interfaces/user.interface';
import { Paginator } from 'src/utils/paginator';

@QueryHandler(GetAllUserQuery)
export class GetAllUserQueryHandler implements IQueryHandler<GetAllUserQuery> {
  constructor(
    @Inject(Repository) private readonly userRepository: Repository<IUser>,
  ) {}
  execute(
    query: GetAllUserQuery,
  ): Promise<IUser[] | { data: IUser[]; pageInfo: Paginator }> {
    return this.userRepository.find(UserUtils.allUserFilterOption);
  }
}
