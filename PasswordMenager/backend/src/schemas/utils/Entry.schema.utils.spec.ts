import { Cipher } from 'src/utils/cipher.utils';
import { Decipher } from 'src/utils/decipher.utils';
import { EntrySchemaUtils } from './Entry.schema.utils';
import { IEntry } from '../Interfaces/entry.interface';

describe('EntrySchemaUtils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.iv = '1111111111111111';
    process.env.secretkey = `vOVH6sdmpJPNA500%NWjRRIqCc7rdxs0`;
  });
  describe('PostFind', () => {
    it('should decrypt passwords for each entry', () => {
      // Arrange
      const result = [
        { userid: '123123123123123123123123123123123', password: 'encrypted1' },
        { userid: '123123123123123123123123123123123', password: 'encrypted2' },
      ];
      const decryptSpy = jest.spyOn(Decipher.prototype, 'decryptValue');

      // Act
      const decryptedResult = EntrySchemaUtils.PostFind(
        result as unknown as IEntry[],
      );

      // Assert
      expect(decryptSpy).toHaveBeenCalledTimes(2);
      expect(decryptedResult).toEqual([
        { userid: '123123123123123123123123123123123', password: '' },
        { userid: '123123123123123123123123123123123', password: '' },
      ]);
    });
  });

  describe('PostFindOne', () => {
    it('should decrypt password for a single entry', () => {
      // Arrange
      const result = {
        userid: '123123123123123123123123123123123',
        password: 'encrypted',
      };
      const decryptSpy = jest.spyOn(Decipher.prototype, 'decryptValue');

      // Act
      const decryptedResult = EntrySchemaUtils.PostFindOne(
        result as unknown as IEntry,
      );

      // Assert
      expect(decryptSpy).toHaveBeenCalledTimes(1);
      expect(decryptedResult).toEqual({
        userid: '123123123123123123123123123123123',
        password: '',
      });
    });
  });

  describe('BeforeSave', () => {
    it('should encrypt password before saving', () => {
      // Arrange
      const entry = {
        userid: '123123123123123123123123123123123',
        password: 'password',
      };
      const next = jest.fn();
      const encryptSpy = jest.spyOn(Cipher.prototype, 'encryptValue');

      // Act
      EntrySchemaUtils.BeforeSave.call(entry, next);

      // Assert
      expect(encryptSpy).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledTimes(1);
      expect(entry.password).not.toBe('password');
    });
  });
});
