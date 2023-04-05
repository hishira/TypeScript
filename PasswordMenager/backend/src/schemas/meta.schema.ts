import * as mongoose from 'mongoose';
import { IMeta } from './Interfaces/meta.interface';
export const PureMetaObject = {
  crateDate: {
    type: Date,
  },
  firstEditDate: {
    type: Date,
  },
  editDate: {
    type: Date,
  },
};
const MetaSchema = new mongoose.Schema<IMeta>({
  ...PureMetaObject,
});

export default MetaSchema;
