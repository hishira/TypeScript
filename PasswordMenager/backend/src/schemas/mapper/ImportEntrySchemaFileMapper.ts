import { ImportEntrySchema } from '../Interfaces/importRequest.interface';

export interface ImportEntrySchemaFileMapper {
  getMappedImportEntries(): ImportEntrySchema[];
}
