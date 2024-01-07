import { ImportEntrySchema } from 'src/schemas/Interfaces/importRequest.interface';
import { ImportRequestState } from 'src/schemas/importRequest.schema';

export interface ImportRequestInputCommand {
  _id?: string;
  userid?: string;
  created?: Date;
  state?: ImportRequestState;
  entriesToImport?: ImportEntrySchema[];
}
