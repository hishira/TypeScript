import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetSpecificEntry } from 'src/queries/entry/getSpecificEntry.queries';
import {
  EntryData,
  IEntry,
  OptionModelBuilder,
} from 'src/schemas/Interfaces/entry.interface';
import { BaseQueryHandler } from '../BaseQueryHandler';

@QueryHandler(GetSpecificEntry)
export class GetSpecificEntryQueryHandler
  extends BaseQueryHandler<IEntry>
  implements IQueryHandler<GetSpecificEntry>
{
  execute(query: GetSpecificEntry): Promise<IEntry | IEntry[] | EntryData> {
    const { input } = query;
    //TODO: Refactor
    if ('id' in input && Object.keys(input).length === 1) {
      return this.repository.findById(input.id);
    }
    if ('groupId' in input && Object.keys(input).length === 1) {
      const queryOptions = new OptionModelBuilder()
        .updateGroupIdOrNull(input.groupId)
        .getOption();
      return this.repository.find(queryOptions);
    }
    if ('userId' in input && Object.keys(input).length <= 2) {
      const queryOptions = new OptionModelBuilder()
        .updateUserIdOPtion(input.userId)
        .setGroupIdNull()
        .getOption();
      return this.repository.find(
        queryOptions,
        input?.paginator ?? { page: 0 },
      );
    }

    if ('userId' in input && 'entryState' in input && 'limit' in input) {
      const options = new OptionModelBuilder()
        .updateUserIdOPtion(input.userId)
        .updateStateEntry(input.entryState)
        .updateLimit(input.limit)
        .getOption();
      return this.repository.find(options);
    }
  }
}
