import * as mongoose from 'mongoose';
import { IMeta } from './Interfaces/meta.interface';
export const PureMetaObject = {
  crateDate: {
    type: Date,
    default: Date.now(),
  },
  firstEditDate: {
    type: Date,
    default: Date.now(),
  },
  editDate: {
    type: Date,
    default: Date.now(),
  },
};
const MetaSchema = new mongoose.Schema<IMeta>({
  ...PureMetaObject,
});

export default MetaSchema;
