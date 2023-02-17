import * as mognoose from 'mongoose';
import * as crypto from 'crypto';
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
  const cipher = crypto.createCipheriv(
    algorithm,
    process.env.secretkey,
    process.env.iv,
  );
  const encrypted = Buffer.concat([
    cipher.update(encryptedPasswod),
    cipher.final(),
  ]);
  this.password = encrypted.toString('hex');
  console.log(this.password);
  next();
});
EntrySchema.post('find', function (result) {
  
 result.forEach((res)=>{
    const encryptedPassword = res.password;
    const decipher = crypto.createDecipheriv(algorithm,process.env.secretkey, process.env.iv);
    const decryptedPassword = Buffer.concat([decipher.update(Buffer.from(encryptedPassword,'hex')),decipher.final()]);
    res.password = decryptedPassword.toString()
    
  });
  return result
});
export default EntrySchema;
