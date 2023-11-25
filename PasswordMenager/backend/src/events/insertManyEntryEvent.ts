import { DTO } from 'src/schemas/dto/object.interface';

export class InsertmanyEntryEvent {
  constructor(readonly dtos: DTO[]) {}
}
