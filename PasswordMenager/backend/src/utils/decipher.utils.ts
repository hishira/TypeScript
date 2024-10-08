import * as crypto from 'crypto';

export class Decipher {
  private algorihtm: string;
  private secrectKey: string | Buffer;
  private iv: string;
  private decipher: crypto.Decipher;

  constructor(algorihtm: string, secrectKey: string | Buffer, iv: string) {
    this.algorihtm = algorihtm;
    this.secrectKey = secrectKey;
    this.iv = iv;
    this.decipher = this.getDecipher();
  }

  public getDecipher(): crypto.Decipher {
    return crypto.createDecipheriv(this.algorihtm, this.secrectKey, this.iv);
  }

  public createBufferFrom(bufferedValue: string): Buffer {
    return Buffer.from(bufferedValue, 'hex');
  }

  public decryptValue(value: string): string {
    const decryptedBufferValue = Buffer.concat([
      this.decipher.update(this.createBufferFrom(value)),
      this.decipher.final(),
    ]);
    return decryptedBufferValue.toString();
  }
}
