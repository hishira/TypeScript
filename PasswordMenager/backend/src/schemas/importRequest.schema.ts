import mongoose from 'mongoose';
import {
  ImportEntrySchema,
  ImportRequest,
} from './Interfaces/importRequest.interface';

/*  Before createing entries from import, we create
    import request.
*/

export enum ImportRequestState {
  Active = 'active',
  Complete = 'complete',
  Deleted = 'deleted',
}
const ImportRequestSchema = new mongoose.Schema<ImportRequest>({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
  state: {
    type: String,
    enum: Object.values(ImportRequestState),
    default: ImportRequestState.Active,
  },
  entriesToImport: [ImportEntrySchema.MongoDbSchema()],
});

export default ImportRequestSchema;
