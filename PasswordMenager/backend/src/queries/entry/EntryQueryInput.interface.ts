import { EntryState } from 'src/schemas/Interfaces/entry.interface';
import { PaginatorDto } from 'src/utils/paginator';

export interface EntryQueryInput {
  readonly id?: string;
  readonly groupId?: string;
  readonly userId?: string;
  readonly entryState?: EntryState;
  readonly limit?: number;
  readonly paginator?: PaginatorDto;
}
