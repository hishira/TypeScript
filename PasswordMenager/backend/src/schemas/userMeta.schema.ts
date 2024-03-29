import { Schema } from 'mongoose';
import { IUserMeta } from './Interfaces/userMeta.interface';
import { PureMetaObject } from './meta.schema';

const UserMetaSchema = new Schema<IUserMeta>({
  ...PureMetaObject,
  lastLogin: {
    type: String,
    default: null,
  },
  lastPassword: {
    type: String,
    default: null,
  },
});

export default UserMetaSchema;
