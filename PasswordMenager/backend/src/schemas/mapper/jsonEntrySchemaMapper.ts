import { ImportEntrySchema } from '../Interfaces/importRequest.interface';
import { EntrySchemaFileMapper } from './entrySchemaFileMappre';

type MapperType = 'array' | 'object';
export class JsonEntrySchemaMapper extends EntrySchemaFileMapper {
  parsedJsonData: unknown;
  parsedMapper: { [keyof in MapperType]: () => ImportEntrySchema[] } = {
    array: this.arrayJsonMapper.bind(this),
    object: this.objectJsonMapper.bind(this),
  };
  mapStringToImportSchemas(): void {
    this.parsedJsonData = JSON.parse(this.stringContent);
    const mapType: MapperType = Array.isArray(this.parsedJsonData)
      ? 'array'
      : 'object';
    this.importEntrySchemas = this.parsedMapper[mapType]();
  }

  arrayJsonMapper(): ImportEntrySchema[] {
    const importEntriesSchema: ImportEntrySchema[] = [];
    (this.parsedJsonData as Record<string, string>[]).forEach((jsonData) => {
      importEntriesSchema.push(
        new ImportEntrySchema(
          jsonData?.password ?? undefined,
          jsonData?.username ?? undefined,
          jsonData?.url ?? undefined,
          jsonData?.title ?? undefined,
          jsonData?.email ?? undefined,
        ),
      );
    });
    return importEntriesSchema;
  }

  // TODO FIX
  objectJsonMapper(): ImportEntrySchema[] {
    const importEntriesSchema: ImportEntrySchema[] = [
      new ImportEntrySchema(
        (this.parsedJsonData as Record<string, string>)?.password,
        (this.parsedJsonData as Record<string, string>)?.username,
        (this.parsedJsonData as Record<string, string>)?.url,
        (this.parsedJsonData as Record<string, string>)?.title,
        (this.parsedJsonData as Record<string, string>)?.email,
      ),
    ];

    return importEntriesSchema;
  }
}
