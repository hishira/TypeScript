import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FilterQuery } from 'mongoose';
import { GetFilteredGroup } from 'src/queries/group/getFilteredGroup.queries';
import { IGroup } from 'src/schemas/Interfaces/group.interface';
import {
  GroupOptionBuilder,
  Option,
} from 'src/schemas/utils/builders/groupOption.builder';
import { BaseQueryHandler } from '../BaseQueryHandler';
import { GroupResponse } from 'src/types/common/main';

@QueryHandler(GetFilteredGroup)
export class GetFilteredGroupQueryHandler
  extends BaseQueryHandler<IGroup>
  implements IQueryHandler<GetFilteredGroup, GroupResponse>
{
  execute(query: GetFilteredGroup): Promise<GroupResponse> {
    const groupOption = this.buildOption(query);
    return this.repository.find(groupOption);
  }

  buildOption(query: GetFilteredGroup): Option<FilterQuery<IGroup>> {
    return new GroupOptionBuilder()
      .updateUserId(query.groupQueryInput.userId)
      .updateId(query.groupQueryInput.id)
      .getOption();
  }
}
