import { Cipher } from 'src/utils/cipher.utils';
import { Decipher } from 'src/utils/decipher.utils';
export const algorithm = 'aes-256-ctr';

// TODO: Change iv problem
export class EntrySchemaUtils {
  static generateKeyValue(userid): Buffer | string {
    let bs = Buffer.from(userid, 'utf-8').subarray(0, 32);
    if (bs.length < 32) {
      const lengthToAppend = 32 - bs.length;
      const firstFromId = (userid.toString() as string).slice(
        0,
        lengthToAppend,
      );
      bs = Buffer.concat([bs, Buffer.from(firstFromId)]);
    }
    return bs;
  }

  static PostFind(result) {
    result.forEach((res) => {
      const encryptedPassword = res.password;
      const bs = EntrySchemaUtils.generateKeyValue(res.userid);
      res.password = new Decipher(algorithm, bs, process.env.iv).decryptValue(
        encryptedPassword,
      );
    });
    return result;
  }

  static BeforeSave(this, next) {
    const encryptedPasswod = this.password;
    const bs = EntrySchemaUtils.generateKeyValue(this.userid);

    this.password = new Cipher(algorithm, bs, process.env.iv).encryptValue(
      encryptedPasswod,
    );
    next();
  }
}
