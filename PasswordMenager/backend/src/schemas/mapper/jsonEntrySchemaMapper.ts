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
    (this.parsedJsonData as any[]).forEach((jsonData) => {
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
  objectJsonMapper(): ImportEntrySchema[] {
    const importEntriesSchema: ImportEntrySchema[] = [];

    return importEntriesSchema;
  }
}