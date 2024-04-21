import {
  ImportEntrySchema,
  ImportRequest,
} from 'src/schemas/Interfaces/importRequest.interface';

export type ImportEntryResponse = {
  numberOfEntriesToAdd: number;
  entiresToImport: ImportEntrySchema[];
  importRequestId: any;
};

export class ImportEntriesResponse {
  constructor(
    private readonly importEntries: ImportEntrySchema[],
    private readonly importRequest: ImportRequest,
  ) {}

  get ResponseResolve(): ImportEntryResponse {
    return {
      numberOfEntriesToAdd: this.importEntries.length,
      entiresToImport: this.importEntries.slice(0, 10),
      importRequestId: this.importRequest._id,
    };
  }
}
