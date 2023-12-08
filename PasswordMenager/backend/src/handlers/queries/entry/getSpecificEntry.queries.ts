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
    console.log(input);
    if ('id' in input && Object.keys(input).length === 1) {
      return this.repository.findById(input.id);
    }
    const isPaginatorDefined = 'page' in input || 'paginator' in input;
    const option = new OptionModelBuilder()
      .updateGroupIdOrNull(input.groupId)
      .updateUserIdOPtion(input.userId)
      .updateTitle(input.title)
      .updateLimit(input.limit)
      .updateStateEntry(input.entryState)
      .getOption();

    return this.repository.find(
      option,
      isPaginatorDefined
        ? { page: input?.page ?? input?.paginator?.page }
        : { page: 0 },
    );
  }
}
