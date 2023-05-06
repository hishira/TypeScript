import { randomBytes } from 'crypto';

export class Encrypt {
  private password: string;
  private salt: Buffer;
  private iv: Buffer;
  constructor(password: string, encryptAlgorithm: string) {
    this.password = password;
    this.salt = randomBytes(16);
    this.iv = randomBytes(16);
  }
}
