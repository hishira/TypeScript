import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetExistingGroupQuery } from 'src/queries/group/getExistingGroup.queries';
import { GroupUtils, IGroup } from 'src/schemas/Interfaces/group.interface';
import { BaseQueryHandler } from '../BaseQueryHandler';
@QueryHandler(GetExistingGroupQuery)
export class GetExistingGroupQueryHandler
  extends BaseQueryHandler<IGroup>
  implements IQueryHandler<GetExistingGroupQuery>
{
  execute(query: GetExistingGroupQuery): Promise<any> {
    const { groupQueryInput } = query;
    return this.repository
      .findById(groupQueryInput.id)
      .then((data) => GroupUtils.EmptyGroupGuard(data));
  }
}
