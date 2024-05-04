import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetImportQuery } from 'src/queries/import/getImports.queries';
import { ImportRequest } from 'src/schemas/Interfaces/importRequest.interface';
import { ImportRequestBuilder } from 'src/schemas/utils/builders/importRequest.builder';
import { BaseQueryHandler } from '../BaseQueryHandler';
import { BaseError } from 'src/errors/bace-error';

@QueryHandler(GetImportQuery)
export class GetImportQueryHandler
  extends BaseQueryHandler<ImportRequest>
  implements IQueryHandler<GetImportQuery>
{
  execute(
    query: GetImportQuery,
  ): Promise<ImportRequest[] | BaseError | PaginatorData<ImportRequest>> {
    const { input } = query;
    const importRequestOption = new ImportRequestBuilder()
      .setId(input.id)
      .setState(input.state)
      .setUserId(input.userId)
      .getOption();
    return this.repository.find(importRequestOption);
  }
}
