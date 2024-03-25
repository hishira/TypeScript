import { CsvEntrySchemaMapper } from './csvEntrySchemaMapper';
import {
  ImportEntrySchemaMapperFactory,
  MapperOptions,
} from './importEntrySchemaMapperFactory';
import { JsonEntrySchemaMapper } from './jsonEntrySchemaMapper';

describe('ImportEntrySchemaMapperFactory', () => {
  describe('GetEntrySchemaMapper', () => {
    it('should return a CsvEntrySchemaMapper instance when mapType is "csv"', () => {
      const options: MapperOptions = {
        separator: ',',
        fileContentAsString:
          'Title1,user1,pass1,note1\r\nTitle2,user2,pass2,note2\r\n',
      };

      const mapper = ImportEntrySchemaMapperFactory.GetEntrySchemaMapper(
        'csv',
        options,
      );

      expect(mapper).toBeInstanceOf(CsvEntrySchemaMapper);
    });

    it('should return a JsonEntrySchemaMapper instance when mapType is "json"', () => {
      const options: MapperOptions = {
        separator: ',',
        fileContentAsString:
          '[{"title": "Title1", "username": "user1", "password": "pass1", "note": "note1"}]',
      };

      const mapper = ImportEntrySchemaMapperFactory.GetEntrySchemaMapper(
        'json',
        options,
      );

      expect(mapper).toBeInstanceOf(JsonEntrySchemaMapper);
    });

    it('should throw an error for unknown mapType', () => {
      const options: MapperOptions = {
        separator: ',',
        fileContentAsString: '',
      };

      expect(() => {
        ImportEntrySchemaMapperFactory.GetEntrySchemaMapper(
          'unknown' as any,
          options,
        );
      }).toThrow(Error);
    });
  });
});
