import * as mongoose from 'mongoose';
import { IGroup } from './Interfaces/group.interface';
import GroupMetaSchema from './groupMeta.schema';

const GroupSchema = new mongoose.Schema<IGroup>({
  name: {
    type: String,
    required: true,
    set: function (name: string): string {
      this._name = this.name;
      return name;
    },
  },
  userid: {
    type: String,
    required: true,
  },
  meta: {
    type: GroupMetaSchema,
    requred: true,
    default: (): Record<string, unknown> => ({}),
  },
});

export default GroupSchema;
