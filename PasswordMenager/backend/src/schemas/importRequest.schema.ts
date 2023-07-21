import mongoose from 'mongoose';
import {
  ImportEntrySchema,
  ImportRequest,
} from './Interfaces/importRequest.interface';

/*  Before createing entries from import, we create
    import request.
*/
const ImportRequestSchema = new mongoose.Schema<ImportRequest>({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
  entriesToImport: [ImportEntrySchema],
});

export default ImportRequestSchema;
