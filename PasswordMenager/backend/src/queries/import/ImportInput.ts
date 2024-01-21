import { ImportRequestState } from 'src/schemas/importRequest.schema';

export interface ImportInput {
  readonly id?: string;
  readonly userId?: string;
  readonly state?: ImportRequestState;
}
