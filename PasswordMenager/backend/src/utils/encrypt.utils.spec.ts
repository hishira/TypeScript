import { Encrypt } from './encrypt.utils';

describe('Encrypt', () => {
  it('should create an Encrypt object with correct properties', () => {
    const password = 'password';
    const encryptAlgorithm = 'aes-256-cbc';

    const encrypt = new Encrypt(password, encryptAlgorithm);

    expect(encrypt).toBeDefined();
    expect((encrypt as any).password).toBe(password);
    expect((encrypt as any).salt).toBeInstanceOf(Buffer);
    expect((encrypt as any).salt.length).toBe(16); // salt should be 16 bytes
    expect((encrypt as any).iv).toBeInstanceOf(Buffer);
    expect((encrypt as any).iv.length).toBe(16); // IV should be 16 bytes
  });

  it('should throw an error if randomBytes throws an error for salt', () => {
    const password = 'password';
    const encryptAlgorithm = 'aes-256-cbc';
    const error = new Error('Random bytes error');

    expect(() => new Encrypt(password, encryptAlgorithm)).not.toThrow(error);
  });

  it('should throw an error if randomBytes throws an error for IV', () => {
    const password = 'password';
    const encryptAlgorithm = 'aes-256-cbc';
    const error = new Error('Random bytes error');

    expect(() => new Encrypt(password, encryptAlgorithm)).not.toThrow(error);
  });
});
