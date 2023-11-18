import { DTO } from 'src/schemas/dto/object.interface';

export class CreateEntryBulkCommand {
  constructor(public readonly entriesObjects: DTO[]) {}
}
