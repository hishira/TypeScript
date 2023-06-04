import * as crypto from 'crypto';

export class Cipher {
  private algorihtm: string;
  private secrectKey: string | Buffer;
  private iv: string;
  private cipher: crypto.Cipher;

  constructor(algorihtm: string, secrectKey: string | Buffer, iv: string) {
    this.algorihtm = algorihtm;
    this.secrectKey = secrectKey;
    this.iv = iv;
    this.cipher = this.getCipher();
  }

  public getCipher(): crypto.Cipher {
    return crypto.createCipheriv(this.algorihtm, this.secrectKey, this.iv);
  }

  public createBufferFrom(bufferedValue: string): Buffer {
    return Buffer.from(bufferedValue, 'hex');
  }

  public encryptValue(value: string) {
    const enryptedValue = Buffer.concat([
      this.cipher.update(value),
      this.cipher.final(),
    ]);
    return enryptedValue.toString('hex');
  }
}
