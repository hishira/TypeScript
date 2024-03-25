import { ImportEntrySchema } from '../Interfaces/importRequest.interface';
import { JsonEntrySchemaMapper } from './jsonEntrySchemaMapper';

describe('JsonEntrySchemaMapper', () => {
  describe('mapStringToImportSchemas', () => {
    it('should correctly map JSON string to ImportEntrySchema array using arrayJsonMapper', () => {
      const jsonString =
        '[{"title":"Title 1","username":"user1","password":"pass1","email":"email1@example.com"},{"title":"Title 2","username":"user2","password":"pass2","email":"email2@example.com"}]';
      const mapper = new JsonEntrySchemaMapper(jsonString);

      mapper.mapStringToImportSchemas();

      expect((mapper as any).importEntrySchemas).toBeDefined();
      expect(Array.isArray((mapper as any).importEntrySchemas)).toBeTruthy();
      expect((mapper as any).importEntrySchemas).toHaveLength(2);

      (mapper as any).importEntrySchemas.forEach(
        (schema: ImportEntrySchema, index: number) => {
          expect(schema).toBeInstanceOf(ImportEntrySchema);
          expect(schema.title).toBe(`Title ${index + 1}`);
          expect(schema.username).toBe(`user${index + 1}`);
          expect(schema.password).toBe(`pass${index + 1}`);
          expect(schema.email).toBe(`email${index + 1}@example.com`);
        },
      );
    });

    it('should correctly map JSON string to ImportEntrySchema array using objectJsonMapper', () => {
      const jsonString = JSON.stringify({
        title: 'Title',
        username: 'user',
        password: 'pass',
        email: 'email@example.com',
      });
      const mapper = new JsonEntrySchemaMapper(jsonString);

      mapper.mapStringToImportSchemas();

      expect((mapper as any).importEntrySchemas).toBeDefined();
      expect(Array.isArray((mapper as any).importEntrySchemas)).toBeTruthy();
      expect((mapper as any).importEntrySchemas).toHaveLength(1);

      const schema = (mapper as any).importEntrySchemas[0];
      expect(schema).toBeInstanceOf(ImportEntrySchema);
      expect(schema.title).toBe('Title');
      expect(schema.username).toBe('user');
      expect(schema.password).toBe('pass');
      expect(schema.email).toBe('email@example.com');
    });
  });
});
