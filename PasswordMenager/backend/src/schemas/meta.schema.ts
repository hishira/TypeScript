import * as mongoose from 'mongoose';

const MetaSchema = new mongoose.Schema({
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
});

export default MetaSchema;
