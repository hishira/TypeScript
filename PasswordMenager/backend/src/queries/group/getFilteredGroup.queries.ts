import { GroupQueryInput } from './GroupQueryInput.interface';

export class GetFilteredGroup {
  constructor(public readonly groupQueryInput: GroupQueryInput) {}
}
