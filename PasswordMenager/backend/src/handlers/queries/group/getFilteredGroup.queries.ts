import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FilterQuery } from 'mongoose';
import { GetFilteredGroup } from 'src/queries/group/getFilteredGroup.queries';
import {
  GroupOptionBuilder,
  IGroup,
  Option,
} from 'src/schemas/Interfaces/group.interface';
import { Repository } from 'src/schemas/Interfaces/repository.interface';
import { Paginator } from 'src/utils/paginator';

//TODO move
export type GroupResponse =
  | IGroup[]
  | {
      data: IGroup[];
      pageInfo: Paginator;
    };
@QueryHandler(GetFilteredGroup)
export class GetFilteredGroupQueryHandler
  implements IQueryHandler<GetFilteredGroup, GroupResponse>
{
  constructor(
    @Inject(Repository) private readonly groupRepository: Repository<IGroup>,
  ) {}
  execute(query: GetFilteredGroup): Promise<GroupResponse> {
    const groupOption = this.buildOption(query);
    return this.groupRepository.find(groupOption);
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
