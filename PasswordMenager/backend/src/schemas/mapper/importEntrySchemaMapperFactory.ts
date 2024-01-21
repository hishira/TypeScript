import { CsvEntrySchemaMapper } from './csvEntrySchemaMapper';
import { EntrySchemaFileMapper } from './entrySchemaFileMappre';
import { JsonEntrySchemaMapper } from './jsonEntrySchemaMapper';
export type MapperOptions = {
  separator: string;
  fileContentAsString: string;
};
export class ImportEntrySchemaMapperFactory {
  static GetEntrySchemaMapper(
    mapType: 'json' | 'csv',
    options: MapperOptions,
  ): EntrySchemaFileMapper {
    return mapType === 'csv'
      ? new CsvEntrySchemaMapper(options.fileContentAsString, options.separator)
      : new JsonEntrySchemaMapper(
          options.fileContentAsString,
          options.separator,
        );
  }
}
