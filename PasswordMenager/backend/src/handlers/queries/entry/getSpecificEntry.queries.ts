import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetSpecificEntry } from 'src/queries/entry/getSpecificEntry.queries';
import { EntryData, IEntry } from 'src/schemas/Interfaces/entry.interface';
import { OptionModelBuilder } from 'src/schemas/utils/builders/optionModal.builder';
import { BaseQueryHandler } from '../BaseQueryHandler';
import { BaseError } from 'src/errors/bace-error';

@QueryHandler(GetSpecificEntry)
export class GetSpecificEntryQueryHandler
  extends BaseQueryHandler<IEntry>
  implements IQueryHandler<GetSpecificEntry>
{
  execute(
    query: GetSpecificEntry,
  ): Promise<IEntry | IEntry[] | EntryData | BaseError> {
    const { input } = query;

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

    const pagination = isPaginatorDefined
      ? { page: input.page ?? input.paginator?.page }
      : undefined;

    return this.repository.find(option, pagination);
  }
}
