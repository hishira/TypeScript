import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetSpecificEntry } from 'src/queries/entry/getSpecificEntry.queries';
import { EntryData, IEntry } from 'src/schemas/Interfaces/entry.interface';
import { OptionModelBuilder } from 'src/schemas/utils/builders/optionModal.builder';
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
    if ('userId' in input && Object.keys(input).length <= 3) {
      const queryOptions = new OptionModelBuilder()
        .updateUserIdOPtion(input.userId)
        .updateTitle(input.title)
        .setGroupIdNull()
        .getOption();
      console.log(queryOptions.getOption());
      return this.repository
        .find(queryOptions, input?.paginator ?? { page: 0 })
        .catch((e) => {
          console.log(e);
          return [];
        });
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
