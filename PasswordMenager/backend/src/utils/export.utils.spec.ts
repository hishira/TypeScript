import { createCipheriv, pbkdf2Sync, randomBytes } from 'crypto';
import { IEntry } from 'src/schemas/Interfaces/entry.interface';
import { ExportCsvUtils } from './export.utils';
export const entryMock = (entry?: IEntry): IEntry =>
  entry ??
  ({
    _id: '11111111111111111111111111111111',
    title: 'test title',
    userid: 'asd123cxz',
    username: 'test username',
    password: 'dupa123',
    note: 'dupa',
    groupid: '11111111111111111111111111111111',
    passwordExpiredDate: Date.now(),
    meta: {
      crateDate: Date.now(),
      firstEditDate: Date.now(),
      editDate: Date.now(),
      lastNote: null,
      lastPassword: null,
      lastTitle: null,
      lastUsername: null,
      lastEditedVariable: null,
    },
  } as unknown as IEntry);
jest.mock('crypto', () => ({
  randomBytes: jest.fn(),
  createCipheriv: jest.fn(),
  pbkdf2Sync: jest.fn(),
}));

describe('ExportCsvUtils', () => {
  beforeEach(() => {
    (randomBytes as jest.Mock).mockReset();
    (createCipheriv as jest.Mock).mockReset();
    (pbkdf2Sync as jest.Mock).mockReset();
  });

  describe('MapEntryToCSVRow', () => {
    it('should map entry to CSV row', () => {
      const entry = entryMock();
      const csvRow = ExportCsvUtils.MapEntryToCSVRow(entry);
      expect(csvRow).toEqual(['test title', 'dupa123', 'dupa', '\r\n']);
    });
  });

  describe('GenerateValueForEntryptedData', () => {
    it('should generate salt, iv, and key for encryption', () => {
      const salt = Buffer.alloc(16);
      const iv = Buffer.alloc(16);
      const key = Buffer.alloc(32);
      (randomBytes as jest.Mock)
        .mockReturnValueOnce(salt)
        .mockReturnValueOnce(iv);
      (pbkdf2Sync as jest.Mock).mockReturnValueOnce(key);

      const result = ExportCsvUtils.GenerateValueForEntryptedData('password');

      expect(result).toEqual({ salt, iv, key });
      expect(randomBytes).toHaveBeenCalledWith(16);
      expect(randomBytes).toHaveBeenCalledWith(16);
      expect(pbkdf2Sync).toHaveBeenCalledWith(
        'password',
        salt,
        100000,
        32,
        'sha256',
      );
    });
  });

  describe('GetEncryptedDataBuffer', () => {
    it('should generate encrypted data buffer', () => {
      const entry = entryMock();
      const entries = [entry];
      const salt = Buffer.alloc(16);
      const iv = Buffer.alloc(16);
      const key = Buffer.alloc(32);
      (randomBytes as jest.Mock)
        .mockReturnValueOnce(salt)
        .mockReturnValueOnce(iv);
      (pbkdf2Sync as jest.Mock).mockReturnValueOnce(key);

      const cipher = {
        update: jest.fn().mockReturnValueOnce('encryptedContent'),
        final: jest.fn().mockReturnValueOnce('finalContent'),
      };
      (createCipheriv as jest.Mock).mockReturnValueOnce(cipher);

      const encryptedData = ExportCsvUtils.GetEncryptedDataBuffer(entries);

      expect(encryptedData).toBeInstanceOf(Buffer);
      expect(encryptedData.length).toBeGreaterThan(0);
      expect(randomBytes).toHaveBeenCalledWith(16);
      expect(randomBytes).toHaveBeenCalledWith(16);
      expect(pbkdf2Sync).toHaveBeenCalledWith(
        '123456',
        salt,
        100000,
        32,
        'sha256',
      );
      expect(createCipheriv).toHaveBeenCalledWith('aes-256-cbc', key, iv);
      expect(cipher.update).toHaveBeenCalledWith('dupa123', 'utf8', 'base64');
      expect(cipher.final).toHaveBeenCalled();
    });
  });

  // Add more test cases for other methods if needed
});
