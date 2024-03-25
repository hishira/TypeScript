import { ImportEntrySchema } from '../Interfaces/importRequest.interface';
import { CsvEntrySchemaMapper } from './csvEntrySchemaMapper';

describe('CsvEntrySchemaMapper', () => {
  describe('mapStringToImportSchemas', () => {
    it('should correctly map CSV string to ImportEntrySchema array with default separator', () => {
      const csvString =
        'Title1,user1,pass1,note1\r\nTitle2,user2,pass2,note2\r\n';
      const mapper = new CsvEntrySchemaMapper(csvString);

      mapper.mapStringToImportSchemas();

      expect((mapper as any).importEntrySchemas).toBeDefined();
      expect(Array.isArray((mapper as any).importEntrySchemas)).toBeTruthy();
      expect((mapper as any).importEntrySchemas).toHaveLength(2);

      (mapper as any).importEntrySchemas.forEach(
        (schema: ImportEntrySchema, index: number) => {
          expect(schema).toBeInstanceOf(ImportEntrySchema);
          expect(schema.title).toBe(`note${index + 1}`);
          expect(schema.username).toBe(`user${index + 1}`);
          expect(schema.password).toBe(`pass${index + 1}`);
        },
      );
    });

    it('should correctly map CSV string to ImportEntrySchema array with custom separator', () => {
      const csvString =
        'Title1|user1|pass1|note1\r\nTitle2|user2|pass2|note2\r\n';
      const mapper = new CsvEntrySchemaMapper(csvString, '|');

      mapper.mapStringToImportSchemas();

      expect((mapper as any).importEntrySchemas).toBeDefined();
      expect(Array.isArray((mapper as any).importEntrySchemas)).toBeTruthy();
      expect((mapper as any).importEntrySchemas).toHaveLength(2);

      (mapper as any).importEntrySchemas.forEach(
        (schema: ImportEntrySchema, index: number) => {
          expect(schema).toBeInstanceOf(ImportEntrySchema);
          expect(schema.title).toBe(`note${index + 1}`);
          expect(schema.username).toBe(`user${index + 1}`);
          expect(schema.password).toBe(`pass${index + 1}`);
        },
      );
    });
  });
});
