import { IEntry } from 'src/schemas/Interfaces/entry.interface';
import { Paginator, PaginatorDto } from 'src/utils/paginator';

type LimitObject = {
  limit?: number;
};
export class PaginatorData<T> {
  constructor(public readonly data: T[], public readonly pageInfo: Paginator) {}

  static DefaultPaginatorData<T>(
    data: T[],
    paginator: PaginatorDto,
  ): PaginatorData<T> {
    return new PaginatorData<T>(
      data ?? [],
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
      PaginatorData.DefaultPaginatorData(
        entries,
        paginator,
      ) as unknown as PaginatorData<IEntry>,
    );
  }
  static checkLimitInOptionPossible(
    option: LimitObject,
  ): option is LimitObject {
    return 'limit' in option && typeof option.limit === 'number';
  }

  static isPaginatorDefined(paginator?: PaginatorDto): boolean {
    return (
      !!paginator &&
      'page' in paginator &&
      paginator?.page !== undefined &&
      paginator?.page !== null
    );
  }
}
