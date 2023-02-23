import { Cipher } from 'src/utils/cipher.utils';
import { Decipher } from 'src/utils/decipher.utils';
export const algorithm = 'aes-256-ctr';

export class EntrySchemaUtils {
  static PostFind(result) {
    result.forEach((res) => {
      const encryptedPassword = res.password;
      res.password = new Decipher(
        algorithm,
        process.env.secretkey,
        process.env.iv,
      ).decryptValue(encryptedPassword);
    });
    return result;
  }

  static BeforeSave(this, next) {
    const encryptedPasswod = this.password;
    this.password = new Cipher(
      algorithm,
      process.env.secretkey,
      process.env.iv,
    ).encryptValue(encryptedPasswod);
    next();
  }
}
