export class PaginatorData<T> {
  public readonly pageInfo: PageInformation;

  constructor(
    public readonly data: T[],
    public readonly page: number,
    public readonly haseMoreItems: boolean
  ) {
    this.pageInfo = new PageInformation(data.length, haseMoreItems, page);
  }
}

class PageInformation {
  constructor(
    public readonly items: number,
    public readonly hasMore: boolean,
    public readonly page: number
  ) {}
}
