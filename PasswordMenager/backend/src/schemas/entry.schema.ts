import * as mognoose from 'mongoose';
import { IEntry } from './Interfaces/entry.interface';
import EntryMetaSchema from './entryMeta.schema';
import { EntrySchemaUtils } from './utils/Entry.schema.utils';

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
  userid: {
    type: mognoose.Schema.Types.ObjectId,
    default: '',
  },
  passwordExpiredDate: {
    type: Date,
    default: null,
  },
  meta: {
    type: EntryMetaSchema,
    require: true,
    default: () => ({}),
  },
});
EntrySchema.pre<IEntry>('save', EntrySchemaUtils.BeforeSave);
EntrySchema.post('find', EntrySchemaUtils.PostFind);
EntrySchema.post('findOne', EntrySchemaUtils.PostFindOne);
export default EntrySchema;
