import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetImportQuery } from 'src/queries/import/getImports.queries';
import { ImportRequest } from 'src/schemas/Interfaces/importRequest.interface';
import { BaseQueryHandler } from '../BaseQueryHandler';

@QueryHandler(GetImportQuery)
export class GetImportQueryHandler
  extends BaseQueryHandler<ImportRequest>
  implements IQueryHandler<GetImportQuery>
{
  execute(query: GetImportQuery): Promise<any> {
    const { input } = query;
    if ('userId' in input) {
      const option = {
        getOption: () => ({ userid: input.userId }),
      };
      return this.repository.find(option);
    }
    if ('id' in input) {
      return this.repository.findById(input.id);
    }
  }
}
