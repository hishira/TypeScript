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

@QueryHandler(GetFilteredGroup)
export class GetFilteredGroupQueryHandler
  implements IQueryHandler<GetFilteredGroup>
{
  constructor(
    @Inject(Repository) private readonly groupRepository: Repository<IGroup>,
  ) {}
  execute(query: GetFilteredGroup): Promise<any> {
    const groupOption = this.buildOption(query);
    return this.groupRepository.find(groupOption);
  }

  buildOption(query: GetFilteredGroup): Option<FilterQuery<IGroup>> {
    //TODO: Fix
    if (query.userId !== null) {
      return new GroupOptionBuilder().updateUserId(query.userId).getOption();
    }
    if (query.groupId !== null) {
      return new GroupOptionBuilder().updateId(query.groupId).getOption();
    }
  }
}
