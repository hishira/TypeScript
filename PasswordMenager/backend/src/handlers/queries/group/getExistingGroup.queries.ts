import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetExistingGroupQuery } from 'src/queries/group/getExistingGroup.queries';
import { Inject } from '@nestjs/common';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { GroupUtils, IGroup } from 'src/schemas/Interfaces/group.interface';
@QueryHandler(GetExistingGroupQuery)
export class GetExistingGroupQueryHandler
  implements IQueryHandler<GetExistingGroupQuery>
{
  constructor(
    @Inject(Repository) private readonly groupRepository: Repository<IGroup>,
  ) {}

  execute(query: GetExistingGroupQuery): Promise<any> {
    const { groupQueryInput } = query;
    return this.groupRepository
      .findById(groupQueryInput.id)
      .then((data) => GroupUtils.EmptyGroupGuard(data));
  }
}
