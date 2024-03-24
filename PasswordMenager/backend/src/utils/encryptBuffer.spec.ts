import { createDecipheriv, pbkdf2Sync } from 'crypto';
import { EncryptBuffer } from './encryptBuffer';

jest.mock('crypto', () => ({
  pbkdf2Sync: jest.fn(),
  createDecipheriv: jest.fn(),
}));

describe('EncryptBuffer', () => {
  beforeEach(() => {
    (pbkdf2Sync as jest.Mock).mockReset();
    (createDecipheriv as jest.Mock).mockReset();
  });

  it('should extract salt and IV from the input buffer', () => {
    const salt = Buffer.alloc(16);
    const iv = Buffer.alloc(16);
    const fileBuffer = Buffer.concat([
      salt,
      iv,
      Buffer.from('encryptedContent'),
    ]);

    const encryptBuffer = new EncryptBuffer(fileBuffer);

    expect(encryptBuffer.saltFromBuffer).toEqual(salt);
    expect(encryptBuffer.ivFromBuffer).toEqual(iv);
  });

  it('should decrypt the content using the correct algorithm and key', () => {
    const salt = Buffer.alloc(16);
    const iv = Buffer.alloc(16);
    const encryptedContent = Buffer.from('encryptedContent');
    const fileBuffer = Buffer.concat([salt, iv, encryptedContent]);

    const pbkdfKey = Buffer.alloc(32);
    (pbkdf2Sync as jest.Mock).mockReturnValueOnce(pbkdfKey);

    const decipher = {
      update: jest.fn().mockReturnValueOnce(encryptedContent),
      final: jest.fn().mockReturnValueOnce(Buffer.from('decryptedContent')),
    };
    (createDecipheriv as jest.Mock).mockReturnValueOnce(decipher);

    const encryptBuffer = new EncryptBuffer(fileBuffer);
    const decryptedContent = encryptBuffer.getDecryptedBuffer('utf-8');

    expect(pbkdf2Sync).toHaveBeenCalledWith(
      '123456',
      salt,
      100000,
      32,
      'sha256',
    );
    expect(createDecipheriv).toHaveBeenCalledWith('aes-256-cbc', pbkdfKey, iv);
    expect(decipher.update).toHaveBeenCalledWith(encryptedContent);
    expect(decipher.final).toHaveBeenCalled();
  });
});
