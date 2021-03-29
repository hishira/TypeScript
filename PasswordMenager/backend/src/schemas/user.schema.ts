import * as mongoose from 'mongoose';
import * as bcryptjs from 'bcryptjs';
import { IUser } from './Interfaces/user.interface';

async function beforeUserSave<IUser>(next) {
  let user = this;
  if (user.isModified('password')) {
    user.password = await bcryptjs.hash(user.password, 10);
  }
  next();
}
const UserSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
UserSchema.pre('save', beforeUserSave);
UserSchema.methods.validatePassword = function<IUser>(password: string): boolean {
  return bcryptjs.compareSync(password, this.password);
};
export default UserSchema;
