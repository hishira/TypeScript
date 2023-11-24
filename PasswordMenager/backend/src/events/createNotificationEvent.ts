import { IEntry } from 'src/schemas/Interfaces/entry.interface';

export class CreateNotificationEvent {
  constructor(
    readonly passwordExpireDate: string | Date,
    readonly entry: IEntry,
  ) {}
}
