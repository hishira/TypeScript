import { Types } from 'mongoose';
import { ImportRequest } from 'src/schemas/Interfaces/importRequest.interface';
import { DTO } from 'src/schemas/dto/object.interface';
import { ImportRequestState } from 'src/schemas/importRequest.schema';

export const importRequestMock = (
  importRequest?: ImportRequest,
): ImportRequest =>
  importRequest ??
  ({
    _id: new Types.ObjectId(32),
    created: new Date(Date.now()).toISOString(),
    entriesToImport: [],
    state: ImportRequestState.Active,
  } as unknown as ImportRequest);

export const exampleImportRequestMock = (): DTO => ({
  toObject: () => ({
    _id: new Types.ObjectId(32),
    userid: new Types.ObjectId(32),
    created: new Date(Date.now()).toISOString(),
    entriesToImport: [],
    state: ImportRequestState.Active,
  }),
});
export class ImporRequestMock {
  constructor(private data: ImportRequest = importRequestMock()) {}

  save(): Promise<ImportRequest> {
    return Promise.resolve(this.data);
  }

  static find(option): Promise<ImportRequest[]> {
    return Promise.resolve([importRequestMock(), importRequestMock()]);
  }

  static findById(id: string) {
    return {
      exec: () => Promise.resolve(importRequestMock()),
    };
  }

  static findOneAndUpdate(
    option,
    seters,
    options,
  ): { exec: () => Promise<ImportRequest> } {
    return {
      exec: () => Promise.resolve(importRequestMock()),
    };
  }

  static updateOne(
    option,
    setters,
    options,
  ): { exec: () => Promise<ImportRequest> } {
    return { exec: () => Promise.resolve(importRequestMock()) };
  }
}
