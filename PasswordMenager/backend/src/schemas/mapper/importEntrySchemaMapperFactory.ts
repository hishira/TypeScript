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
    this.CheckProperMapType(mapType);
    return mapType === 'csv'
      ? new CsvEntrySchemaMapper(options.fileContentAsString, options.separator)
      : new JsonEntrySchemaMapper(
          options.fileContentAsString,
          options.separator,
        );
  }
  private static CheckProperMapType(
    mapType: 'json' | 'csv',
  ): asserts mapType is 'json' | 'csv' {
    if (!ImportEntrySchemaMapperFactory.ProperType(mapType))
      throw Error('Invalid mapType');
  }
  private static ProperType(
    mapType: 'json' | 'csv',
  ): mapType is 'json' | 'csv' {
    return mapType === 'json' || mapType === 'csv';
  }
}
