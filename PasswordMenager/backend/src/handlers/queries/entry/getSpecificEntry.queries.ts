import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetSpecificEntry } from 'src/queries/entry/getSpecificEntry.queries';
import { IEntry } from 'src/schemas/Interfaces/entry.interface';
import { BaseQueryHandler } from '../BaseQueryHandler';

@QueryHandler(GetSpecificEntry)
export class GetSpecificEntryQueryHandler
  extends BaseQueryHandler<IEntry>
  implements IQueryHandler<GetSpecificEntry>
{
  execute(query: GetSpecificEntry): Promise<any> {
    const { input } = query;
    if ('id' in input && Object.keys(input).length === 1) {
      return this.repository.findById(input.id);
    }
  }
}
