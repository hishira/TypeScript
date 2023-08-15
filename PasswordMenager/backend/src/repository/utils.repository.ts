import { IEntry } from 'src/schemas/Interfaces/entry.interface';
import { Paginator, PaginatorDto } from 'src/utils/paginator';

class PaginatorData<T> {
  constructor(public readonly data: T[], public readonly pageInfo: Paginator) {}

  static DefaultPaginatorData<T>(
    data: T[],
    paginator: PaginatorDto,
  ): PaginatorData<T> {
    return new PaginatorData<T>(
      data,
      new Paginator(data.length, data.length >= 10, paginator.page),
    );
  }
}
export class UtilsRepository {
  static getEntryPaginatorDateAsPromise(
    entries: IEntry[],
    paginator: PaginatorDto,
  ): Promise<PaginatorData<IEntry>> {
    return Promise.resolve(
      PaginatorData.DefaultPaginatorData(entries, paginator),
    );
  }

  static isPaginatorDefined(paginator?: PaginatorDto): boolean{
    return (
      paginator &&
      'page' in paginator &&
      paginator?.page !== undefined &&
      paginator?.page !== null
    );
  }
}
