import { ImportEntrySchema } from '../Interfaces/importRequest.interface';
import { ImportDTOMapper } from './importDtoMapper';

describe('ImportDTOMapper', () => {
  describe('MapImportRequestsToDTO', () => {
    it('should map ImportEntrySchema to DTO with the provided userid', () => {
      const userid = '123456789';
      const entry = {
        title: 'Entry Title',
        username: 'username',
        password: 'password',
        email: 'example@example.com',
      };

      const dto = ImportDTOMapper.MapImportRequestsToDTO(
        userid,
        entry as unknown as ImportEntrySchema,
      );

      expect(dto).toBeDefined();
      expect(dto).toHaveProperty('toObject');
      expect(typeof dto.toObject).toBe('function');

      const dtoObject = dto.toObject();
      expect(dtoObject).toEqual({
        title: entry.title,
        password: entry.password,
        username: entry.username,
        note: entry.email,
        userid: userid,
      });
    });
  });

  describe('MapImportRequestsToDTOs', () => {
    it('should map an array of ImportEntrySchema to an array of DTOs with the provided userid', () => {
      const userid = '123456789';
      const entries = [
        {
          title: 'Entry Title 1',
          username: 'username1',
          password: 'password1',
          email: 'example1@example.com',
        },
        {
          title: 'Entry Title 2',
          username: 'username2',
          password: 'password2',
          email: 'example2@example.com',
        },
      ];

      const dtos = ImportDTOMapper.MapImportRequestsToDTOs(
        userid,
        entries as unknown as ImportEntrySchema[],
      );

      expect(dtos).toBeDefined();
      expect(Array.isArray(dtos)).toBeTruthy();
      expect(dtos).toHaveLength(entries.length);

      dtos.forEach((dto, index) => {
        expect(dto).toHaveProperty('toObject');
        expect(typeof dto.toObject).toBe('function');

        const dtoObject = dto.toObject();
        expect(dtoObject).toEqual({
          title: entries[index].title,
          password: entries[index].password,
          username: entries[index].username,
          note: entries[index].email,
          userid: userid,
        });
      });
    });
  });
});
