import * as bcryptjs from 'bcryptjs';
import * as mongoose from 'mongoose';
import { IUser } from './Interfaces/user.interface';
import UserMetaSchema from './userMeta.schema';

async function beforeUserSave<IUser>(next) {
  const user = this;
  const oldMeta = user.meta;
  if (user.isModified('password')) {
    user.password = await bcryptjs.hash(user.password, 10);
    user.meta = {
      ...oldMeta,
      lastPassword: user._password,
    };
  }
  next();
}

const UserSchema = new mongoose.Schema<IUser>({
  login: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    set: function (password: string) {
      this._password = this.password;
      return password;
    },
  },
  meta: {
    type: UserMetaSchema,
    required: true,
    default: () => ({}),
  },
});
UserSchema.pre('save', beforeUserSave);
//UserSchema.pre('updateOne', beforeUpdateDoc);
UserSchema.methods.validatePassword = function <IUser>(
  password: string,
): boolean {
  return bcryptjs.compareSync(password, this.password);
};
export default UserSchema;
