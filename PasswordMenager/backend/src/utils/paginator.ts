import { IsNumber, IsOptional } from 'class-validator';

export class Paginator implements IPaginator {
  constructor(
    public items: number,
    public hasMore: boolean,
    public page: number,
  ) {}

  static DefaultPaginator(): Paginator {
    return new Paginator(10, false, 1);
  }
}

export class PaginatorDto implements PaginatorPage {
  @IsNumber()
  @IsOptional()
  page;
}
