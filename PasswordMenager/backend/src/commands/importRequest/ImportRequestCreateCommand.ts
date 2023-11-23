import { ImportRequestDto } from 'src/schemas/Interfaces/importRequest.interface';

export class CreateImportRequestCommand {
  constructor(readonly objectDto: ImportRequestDto) {}
}
