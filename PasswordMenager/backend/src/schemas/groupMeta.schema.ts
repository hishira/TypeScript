import { Schema } from 'mongoose';
import { IGroupMeta } from './Interfaces/groupMeta.interface';
import { PureMetaObject } from './meta.schema';

const GroupMetaSchema = new Schema<IGroupMeta>({
  ...PureMetaObject,
  lastName: {
    type: String,
    default: null,
  },
});

export default GroupMetaSchema;
