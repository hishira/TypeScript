import { PaginatorDto } from 'src/utils/paginator';

export type FindEntryInput = {
  paginator: PaginatorDto;
  title?: string;
};
