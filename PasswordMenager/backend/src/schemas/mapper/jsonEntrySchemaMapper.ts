import { ImportEntrySchema } from '../Interfaces/importRequest.interface';

export interface ImportEntrySchemaFileMapper {
  getMappedImportEntries(): ImportEntrySchema[];
}

export abstract class EntrySchemaFileMapper
  implements ImportEntrySchemaFileMapper
{
  protected readonly importEntrySchemas: ImportEntrySchema[] = [];
  constructor(protected readonly stringContent: string) {}
  getMappedImportEntries(): ImportEntrySchema[] {
    return this.importEntrySchemas;
  }

  abstract mapStringToImportSchemas(): void;
}
export class CsvEntrySchemaMapper extends EntrySchemaFileMapper {
  constructor(stringContent: string, public separator: string = ',') {
    super(stringContent);
  }
  mapStringToImportSchemas(): void {
    const fileRows = this.stringContent.split('\r\n');
    fileRows.forEach((csvRow) => {
      const values = csvRow.split(this.separator);
      const [name, username, password, note] = values;
      this.importEntrySchemas.push(
        new ImportEntrySchema(password, username, name, note, ''),
      );
    });
  }
}
export class JsonEntrySchemaMapper extends EntrySchemaFileMapper {
  mapStringToImportSchemas(): void {
    throw new Error('Method not implemented.');
  }
}
