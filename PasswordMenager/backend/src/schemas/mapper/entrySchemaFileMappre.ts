import { ImportEntrySchema } from '../Interfaces/importRequest.interface';
import { ImportEntrySchemaFileMapper } from './ImportEntrySchemaFileMapper';

export abstract class EntrySchemaFileMapper
  implements ImportEntrySchemaFileMapper
{
  protected importEntrySchemas: ImportEntrySchema[] = [];
  constructor(
    protected readonly stringContent: string,
    protected readonly userDefaultImportPassword?: string,
  ) {}

  getMappedImportEntries(): ImportEntrySchema[] {
    this.mapStringToImportSchemas();
    return this.importEntrySchemas;
  }

  abstract mapStringToImportSchemas(): void;
}
