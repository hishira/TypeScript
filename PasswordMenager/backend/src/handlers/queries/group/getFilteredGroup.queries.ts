import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FilterQuery } from 'mongoose';
import { GetFilteredGroup } from 'src/queries/group/getFilteredGroup.queries';
import { IGroup } from 'src/schemas/Interfaces/group.interface';
import {
  GroupOptionBuilder,
  Option,
} from 'src/schemas/utils/builders/groupOption.builder';
import { Paginator } from 'src/utils/paginator';
import { BaseQueryHandler } from '../BaseQueryHandler';

@QueryHandler(GetFilteredGroup)
export class GetFilteredGroupQueryHandler
  extends BaseQueryHandler<IGroup>
  implements IQueryHandler<GetFilteredGroup, GroupResponse<IGroup, Paginator>>
{
  execute(query: GetFilteredGroup): Promise<GroupResponse<IGroup, Paginator>> {
    const groupOption = this.buildOption(query);
    return this.repository.find(groupOption);
  }

  private buildOption(query: GetFilteredGroup): Option<FilterQuery<IGroup>> {
    return new GroupOptionBuilder()
      .updateUserId(query.groupQueryInput.userId)
      .updateId(query.groupQueryInput.id)
      .getOption();
  }
}
