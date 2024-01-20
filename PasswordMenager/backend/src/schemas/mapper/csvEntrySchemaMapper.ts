import { ImportEntrySchema } from '../Interfaces/importRequest.interface';
import { EntrySchemaFileMapper } from './entrySchemaFileMappre';

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
