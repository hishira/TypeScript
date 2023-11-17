import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FilterQuery } from 'mongoose';
import { GetFilteredGroup } from 'src/queries/group/getFilteredGroup.queries';
import {
  GroupOptionBuilder,
  IGroup,
  Option,
} from 'src/schemas/Interfaces/group.interface';
import { Paginator } from 'src/utils/paginator';
import { BaseQueryHandler } from '../BaseQueryHandler';

//TODO move
export type GroupResponse =
  | IGroup[]
  | {
      data: IGroup[];
      pageInfo: Paginator;
    };
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
    //TODO: Fix
    if ('userId' in query.groupQueryInput) {
      return new GroupOptionBuilder()
        .updateUserId(query.groupQueryInput.userId)
        .getOption();
    }
    if ('id' in query.groupQueryInput) {
      return new GroupOptionBuilder()
        .updateId(query.groupQueryInput.id)
        .getOption();
    }
  }
}
