import { GroupQueryInput } from './GroupQueryInput.interface';

export class GetExistingGroupQuery {
  constructor(public readonly groupQueryInput: GroupQueryInput) {}
}
