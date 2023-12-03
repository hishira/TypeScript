import * as bcryptjs from 'bcryptjs';
import * as mongoose from 'mongoose';
import { IUser } from './Interfaces/user.interface';
import UserMetaSchema from './userMeta.schema';

async function beforeUserSave<IUser>(next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcryptjs.hash(user.password, 10);
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
  defaultPasswordForEntries: {
    // Default password, when in import entries does not have password
    //TODO: Implement logic for it?
    type: String,
    required: false,
    default: null,
  },
  email: {
    type: String,
    required: true,
  },
  meta: {
    type: UserMetaSchema,
    required: true,
    default: () => ({}),
  },
});
UserSchema.pre('save', beforeUserSave);
UserSchema.methods.validatePassword = function <IUser>(
  password: string,
): boolean {
  return bcryptjs.compareSync(password, this.password);
};
export default UserSchema;
