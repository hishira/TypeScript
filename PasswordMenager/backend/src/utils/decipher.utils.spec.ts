import { Decipher } from './decipher.utils';

describe('Decipher', () => {
  const algorithm = 'aes-256-cbc';
  const secretKey = '0123456789abcdef0123456789abcdef'; // 32 bytes
  const iv = 'abcdef9876543210'; // 16 bytes
  const encryptedValue = 'bfc874d6d9f5a3d8b8871505b9c355aa';

  let decipher: Decipher;

  beforeEach(() => {
    decipher = new Decipher(algorithm, secretKey, iv);
  });

  it('should create a Decipher object with correct properties', () => {
    expect(decipher).toBeDefined();
    expect((decipher as any).algorihtm).toBe(algorithm);
    expect((decipher as any).secrectKey).toBe(secretKey);
    expect((decipher as any).iv).toBe(iv);
    expect((decipher as any).decipher).toBeDefined();
  });

  it('should create a buffer from a hex string', () => {
    const hexString = '68656c6c6f';
    const buffer = decipher.createBufferFrom(hexString);
    expect(buffer.toString('hex')).toBe(hexString);
  });

//   it('should decrypt a value correctly', () => {
//     const decryptedValue = decipher.decryptValue(encryptedValue);
//     expect(decryptedValue).toBe('Hello, World!');
//   });
});
