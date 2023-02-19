import * as bcryptjs from 'bcryptjs';
import * as mongoose from 'mongoose';

async function beforeUserSave<IUser>(next) {
  const user = this;
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
UserSchema.methods.validatePassword = function <IUser>(
  password: string,
): boolean {
  return bcryptjs.compareSync(password, this.password);
};
export default UserSchema;
