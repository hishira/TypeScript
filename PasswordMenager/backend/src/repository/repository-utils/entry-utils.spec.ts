import { EntryRepositoryUtils } from './entry-utils';

describe('EntryRepositoryUtils', () => {
  describe('GetMappedDtosToProperEntryDto', () => {
    it('should map DTOs to proper Entry DTOs with userid', () => {
      const dtos: any[] = [
        {
          title: 'Title1',
          username: 'User1',
          password: 'Pass1',
          toObject: () => ({
            title: 'Title1',
            username: 'User1',
            password: 'Pass1',
            userid: 'test',
          }),
        },
        {
          title: 'Title2',
          username: 'User2',
          password: 'Pass2',
          userid: 'test',
          toObject: () => ({
            title: 'Title2',
            username: 'User2',
            password: 'Pass2',
            userid: 'test',
          }),
        },
      ];
      const mappedDtos =
        EntryRepositoryUtils.GetMappedDtosToProperEntryDto(dtos);
      console.log(mappedDtos);
      expect(mappedDtos).toHaveLength(2);
      expect(mappedDtos[0].toObject()).toHaveProperty('title', 'Title1');
      expect(mappedDtos[0].toObject()).toHaveProperty('username', 'User1');
      expect(mappedDtos[0].toObject()).toHaveProperty('password', 'Pass1');
      expect(mappedDtos[0].toObject()).toHaveProperty('userid');
      expect(mappedDtos[1].toObject()).toHaveProperty('title', 'Title2');
      expect(mappedDtos[1].toObject()).toHaveProperty('username', 'User2');
      expect(mappedDtos[1].toObject()).toHaveProperty('password', 'Pass2');
      expect(mappedDtos[1].toObject()).toHaveProperty('userid');
    });

    it('should throw an error for incompatible DTO objects', () => {
      const dtos: any[] = [{ title: 'Title1', username: 'User1' }];
      expect(() => {
        EntryRepositoryUtils.GetMappedDtosToProperEntryDto(dtos);
      }).toThrowError('a.toObject is not a function');
    });
  });

  describe('EntryDtoGuard', () => {
    it('should not throw an error for proper DTO objects', () => {
      const dtos: any[] = [
        {
          title: 'Title1',
          username: 'User1',
          password: 'Pass1',
          userid: '123',
          toObject: () => ({
            title: 'Title2',
            username: 'User2',
            password: 'Pass2',
            userid: 'test',
          }),
        },
        {
          title: 'Title2',
          username: 'User2',
          password: 'Pass2',
          userid: '456',
          toObject: () => ({
            title: 'Title2',
            username: 'User2',
            password: 'Pass2',
            userid: 'test',
          }),
        },
      ];
      expect(() => {
        EntryRepositoryUtils.EntryDtoGuard(dtos);
      }).not.toThrow();
    });

    it('should throw an error for incompatible DTO objects', () => {
      const dtos: any[] = [{ title: 'Title1', username: 'User1' }];
      expect(() => {
        EntryRepositoryUtils.EntryDtoGuard(dtos);
      }).toThrowError(
        'Incopatabile entries, should be array and have title, username and password field',
      );
    });
  });

  describe('IsProperDtosObjects', () => {
    it('should return true for proper DTO objects', () => {
      const dtos: any[] = [
        {
          title: 'Title1',
          username: 'User1',
          password: 'Pass1',
          userid: '123',
        },
        {
          title: 'Title2',
          username: 'User2',
          password: 'Pass2',
          userid: '456',
        },
      ];
      const result = EntryRepositoryUtils.IsProperDtosObjects(dtos);
      expect(result).toBe(true);
    });

    it('should return false for incompatible DTO objects', () => {
      const dtos: any[] = [{ title: 'Title1', username: 'User1' }];
      const result = EntryRepositoryUtils.IsProperDtosObjects(dtos);
      expect(result).toBe(false);
    });
  });

  describe('IsCreateEntryObject', () => {
    it('should return true for a proper CreateEntry object', () => {
      const object = {
        title: 'Title1',
        username: 'User1',
        password: 'Pass1',
        userid: '123',
      };
      const result = EntryRepositoryUtils.IsCreateEntryObject(object);
      expect(result).toBe(true);
    });

    it('should return false for an incomplete object', () => {
      const object = { title: 'Title1', username: 'User1' };
      const result = EntryRepositoryUtils.IsCreateEntryObject(object);
      expect(result).toBe(false);
    });
  });
});
