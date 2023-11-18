import { EditEntryDto } from '../dto/editentry.dto';
import { EntryState } from './entry.interface';

export interface EntryInput {
  readonly id?: string;
  readonly groupId?: string;
  readonly userId?: string;
  readonly entryState?: EntryState;
  readonly updateEntryDto?: EditEntryDto;
}
