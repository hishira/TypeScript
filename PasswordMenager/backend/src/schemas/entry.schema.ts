import * as crypto from 'crypto';
import * as mognoose from 'mongoose';
import { Cipher } from 'src/utils/cipher.utils';
import { Decipher } from 'src/utils/decipher.utils';
import { IEntry } from './Interfaces/entry.interface';

export const algorithm = 'aes-256-ctr';
const EntrySchema = new mognoose.Schema({
  title: {
    type: String,
    default: '',
  },
  username: {
    type: String,
    default: '',
  },
  password: {
    type: String,
    defaulf: '',
  },
  note: {
    type: String,
    default: '',
  },
  groupid: {
    type: mognoose.Schema.Types.ObjectId,
    default: '',
  },
});
EntrySchema.pre<IEntry>('save', function (next) {
  const encryptedPasswod = this.password;
  this.password = new Cipher(
    algorithm,
    process.env.secretkey,
    process.env.iv,
  ).encryptValue(encryptedPasswod);
  next();
});
EntrySchema.post('find', function (result) {
  result.forEach((res) => {
    const encryptedPassword = res.password;
    res.password = new Decipher(
      algorithm,
      process.env.secretkey,
      process.env.iv,
    ).decryptValue(encryptedPassword);
  });
  return result;
});
export default EntrySchema;
