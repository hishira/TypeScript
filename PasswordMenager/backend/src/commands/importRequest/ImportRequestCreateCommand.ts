import { ImportRequestDto } from 'src/schemas/dto/importRequest.dto';

export class CreateImportRequestCommand {
  constructor(readonly objectDto: ImportRequestDto) {}
}
