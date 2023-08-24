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
      PaginatorData.DefaultPaginatorData(
        entries.map((entry) => {
          //TODO: Check
          const isDate = entry instanceof Date;
          console.log(typeof entry.passwordExpiredDate);
          const MappedDate =
            (isDate || typeof entry.passwordExpiredDate === 'object') &&
            entry?.passwordExpiredDate !== undefined
              ? (entry?.passwordExpiredDate as Date)
                  ?.toISOString()
                  ?.split('T')[0]
              : entry?.passwordExpiredDate !== undefined
              ? (entry?.passwordExpiredDate as string)?.split('T')[0]
              : undefined;

          return {
            ...entry,
            passwordExpiredDate: MappedDate,
          };
        }),
        paginator,
      ) as unknown as PaginatorData<IEntry>,
    );
  }

  static isPaginatorDefined(paginator?: PaginatorDto): boolean {
    return (
      paginator &&
      'page' in paginator &&
      paginator?.page !== undefined &&
      paginator?.page !== null
    );
  }
}
