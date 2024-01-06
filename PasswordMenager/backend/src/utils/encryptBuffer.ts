import { createDecipheriv, pbkdf2Sync } from 'crypto';

export class EncryptBuffer {
  private readonly salt = { startByte: 0, endByte: 16 };
  private readonly iv = { startByte: 16, endByte: 32 };
  private readonly key = '123456';
  private readonly algorithm = 'aes-256-cbc';
  private readonly byteOfStartEncryptedContent = 32;
  constructor(readonly fileBuffer: Buffer) {}

  get saltFromBuffer(): Buffer {
    return this.fileBuffer.slice(this.salt.startByte, this.salt.endByte);
  }

  get ivFromBuffer(): Buffer {
    return this.fileBuffer.slice(this.iv.startByte, this.iv.endByte);
  }

  getDecryptedBuffer(encoding: BufferEncoding): string {
    const encryptedContent = this.fileBuffer.slice(
      this.byteOfStartEncryptedContent,
    );
    const pbkdfKey = pbkdf2Sync(
      this.key,
      this.saltFromBuffer,
      100000,
      32,
      'sha256',
    );
    console.log(this.ivFromBuffer.byteLength);
    const decipher = createDecipheriv(
      this.algorithm,
      pbkdfKey,
      this.ivFromBuffer,
    );
    const decryptedContent = Buffer.concat([
      decipher.update(encryptedContent),
      decipher.final(),
    ]);
    return decryptedContent.toString(encoding);
  }
}
