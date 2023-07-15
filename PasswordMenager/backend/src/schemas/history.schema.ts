import * as mognoose from 'mongoose';

import { IHistory } from './Interfaces/history.interface';
import GroupSchema from './group.schema';
import EntrySchema from './entry.schema';

const HistorySchema = new mognoose.Schema<IHistory>({
  userid: {
    type: mognoose.Schema.Types.ObjectId,
    default: null,
  },
  groups: [GroupSchema],
  entities: [EntrySchema],
});

export default HistorySchema;
