import { DeleteOption } from 'src/schemas/Interfaces/deleteoption.interface';
import {
  ImportEntrySchema,
  ImportRequest,
} from 'src/schemas/Interfaces/importRequest.interface';
import { ImportRequestState } from 'src/schemas/importRequest.schema';
import { isDefined } from 'src/utils/utils';

export class ImportRequestBuilder {
  constructor(private importRequest: Partial<ImportRequest> = {}) {}

  setId(importRequestId: string): this {
    this.importRequest = {
      ...this.importRequest,
      ...(isDefined(importRequestId) && { _id: importRequestId }),
    };
    return this;
  }
  setUserId(userid?: string): this {
    this.importRequest = {
      ...this.importRequest,
      ...(isDefined(userid) && { userid }),
    };
    return this;
  }

  setCreateDate(date?: string | Date): this {
    this.importRequest = {
      ...this.importRequest,
      ...(isDefined(date) && { created: date as Date }),
    };
    return this;
  }

  setEntriesToImport(entriesToImport: ImportEntrySchema[]): this {
    this.importRequest = {
      ...this.importRequest,
      ...(isDefined(entriesToImport) && { entriesToImport }),
    };
    return this;
  }

  setState(state: ImportRequestState): this {
    this.importRequest = {
      ...this.importRequest,
      ...(isDefined(state) && { state }),
    };
    return this;
  }

  getOption(): DeleteOption<Partial<ImportRequest>> {
    return {
      getOption: (): Partial<ImportRequest> => this.importRequest,
    };
  }

  getPartialImportRequest(): Partial<ImportRequest> {
    return this.importRequest;
  }
}
