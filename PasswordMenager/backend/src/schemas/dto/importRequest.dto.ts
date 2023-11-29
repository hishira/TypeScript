import { ImportEntrySchema } from '../Interfaces/importRequest.interface';
import { DTO } from './object.interface';

export class ImportRequestDto implements DTO {
  constructor(
    public userid: string,
    public entriesToImport: ImportEntrySchema[],
  ) {}
  toObject(): Record<string, unknown> {
    const { userid, entriesToImport } = this;
    return { userid, entriesToImport };
  }
}
