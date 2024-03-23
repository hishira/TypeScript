import { Cipher } from './cipher.utils';
import * as crypto from 'crypto';

describe('Cipher', () => {
  // Test data
  const algorithm = 'aes-256-cbc';
  const secretKey = '01234567890123456789012345678901'; // 32 bytes (256 bits)
  const iv = '0123456789012345'; // 16 bytes (128 bits)
  const valueToEncrypt = 'Hello, World!';

  it('should encrypt a value', () => {
    // Arrange
    const cipher = new Cipher(algorithm, secretKey, iv);

    // Act
    const encryptedValue = cipher.encryptValue(valueToEncrypt);

    // Assert
    expect(encryptedValue).toBeDefined();
    expect(typeof encryptedValue).toBe('string');
    expect(encryptedValue).not.toEqual(valueToEncrypt);
  });

  it('should decrypt an encrypted value', () => {
    // Arrange
    const cipher = new Cipher(algorithm, secretKey, iv);
    const encryptedValue = cipher.encryptValue(valueToEncrypt);

    // Act
    const decryptedValue = decryptValue(encryptedValue);

    // Assert
    expect(decryptedValue).toBeDefined();
    expect(typeof decryptedValue).toBe('string');
    expect(decryptedValue).toEqual(valueToEncrypt);
  });

  function decryptValue(encryptedValue: string): string {
    const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
    const decryptedValue = Buffer.concat([
      decipher.update(Buffer.from(encryptedValue, 'hex')),
      decipher.final(),
    ]);
    return decryptedValue.toString();
  }
});
