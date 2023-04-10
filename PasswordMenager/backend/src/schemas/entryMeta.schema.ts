import { Schema } from 'mongoose';
import {
  IEntryMeta,
  LastEditedVariable,
} from './Interfaces/entryMeta.interface';
import { PureMetaObject } from './meta.schema';

const EntryMetaSchema = new Schema<IEntryMeta>({
  ...PureMetaObject,
  lastNote: {
    type: String,
    default: null,
  },
  lastPassword: {
    type: String,
    default: null,
  },
  lastTitle: {
    type: String,
    default: null,
  },
  lastUsername: {
    type: String,
    default: null,
  },
  lastEditedVariable: {
    type: String,
    enum: Object.values(LastEditedVariable),
    default: null,
  },
});

export default EntryMetaSchema;
